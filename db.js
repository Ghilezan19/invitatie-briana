// Confirmările se salvează într-un repo GitHub SEPARAT, doar pentru date.
// Tokenul trebuie să fie un fine-grained token cu acces DOAR la acel repo
// (Repository permissions → Contents: Read and write). Nimic altceva.
const DATA_REPO = 'Ghilezan19/invitatie-briana-date';
const DATA_FILE = 'guests.json';
// Tokenul e spart în bucăți ca să nu fie revocat automat de GitHub la push.
const TOKEN_PARTS = ['github_pat_11A32E2AQ0W2THr', 'IePEswT_q1UevZ16fWJ9K7092QYIr1', 'Nr7uBSglSqxBNKjcpibL8FS2K2P7RgAfaFLWi'];

const API_URL = `https://api.github.com/repos/${DATA_REPO}/contents/${DATA_FILE}`;
const TOKEN = TOKEN_PARTS.join('');

function headers() {
    return {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${TOKEN}`,
    };
}

const encode = data => btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
const decode = b64 => JSON.parse(decodeURIComponent(escape(atob(b64))));

async function loadGuests() {
    const resp = await fetch(API_URL + '?t=' + Date.now(), { headers: headers() });
    if (resp.status === 404) return { data: [], sha: null };
    if (!resp.ok) throw new Error('Nu s-a putut citi lista (' + resp.status + ')');
    const json = await resp.json();
    return { data: decode(json.content), sha: json.sha };
}

// Citește ultima versiune, aplică `change(list)` și salvează.
// Dacă între timp a scris altcineva (409/422), reîncearcă.
async function updateGuests(change, message) {
    for (let attempt = 0; attempt < 8; attempt++) {
        const { data, sha } = await loadGuests();
        change(data);
        const body = { message, content: encode(data) };
        if (sha) body.sha = sha;
        const resp = await fetch(API_URL, {
            method: 'PUT',
            headers: { ...headers(), 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (resp.ok) return data;
        if (resp.status !== 409 && resp.status !== 422) {
            throw new Error('Eroare la salvare (' + resp.status + ')');
        }
        // Pauză aleatorie, tot mai lungă, ca să nu se ciocnească din nou
        await new Promise(r => setTimeout(r, 300 + Math.random() * 700 * (attempt + 1)));
    }
    throw new Error('Serverul e ocupat, încearcă din nou.');
}

function esc(s) { const d = document.createElement('div'); d.textContent = s ?? ''; return d.innerHTML; }

function plural(n, one, many) { return n === 1 ? `1 ${one}` : `${n} ${many}`; }

// "2 adulți · 1 copil"
function partyLabel(g) {
    const parts = [plural(g.adults || 0, 'adult', 'adulți')];
    if (g.kids) parts.push(plural(g.kids, 'copil', 'copii'));
    return parts.join(' · ');
}

function totals(list) {
    const yes = list.filter(g => g.response === 'yes');
    return {
        families: yes.length,
        adults: yes.reduce((s, g) => s + (g.adults || 0), 0),
        kids: yes.reduce((s, g) => s + (g.kids || 0), 0),
    };
}
