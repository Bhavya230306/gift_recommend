const http = require('http');

const relationships = ['partner', 'parent', 'friend', 'colleague', 'child', 'sibling', 'other'];
const occasions = ['birthday', 'wedding', 'graduation'];
const personasList = [
    { name: 'Creative Gamer', tags: ['artist', 'gamer'] },
    { name: 'Active Traveler', tags: ['outdoorsy', 'traveller'] },
    { name: 'Cozy Foodie', tags: ['homebody', 'foodie'] }
];

const budgets = [1500, 25000];

function makeRequest(payload) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(payload);
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/api/recommend',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 400) {
                    resolve({ error: true, status: res.statusCode, body });
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });

        req.on('error', e => reject(e));
        req.write(data);
        req.end();
    });
}

async function runTests() {
    console.log('# Recommendation Engine Verification Report\n');
    console.log('Testing a matrix of relationships, occasions, personalities, and budgets.\n');

    for (const rel of relationships) {
        console.log(`\n## Relationship: ${rel.toUpperCase()}`);
        
        for (const occasion of occasions) {
            for (const persona of personasList) {
                for (const budget of budgets) {
                    const payload = {
                        relationship: rel,
                        occasion: occasion,
                        personality_tags: persona.tags,
                        budget_max_inr: budget,
                        notes: ''
                    };
                    
                    try {
                        const response = await makeRequest(payload);
                        
                        let resultText = `* **${occasion.charAt(0).toUpperCase() + occasion.slice(1)} | ${persona.name} | ₹${budget}** -> `;
                        
                        if (response.error) {
                            if (response.status === 422) {
                                resultText += '*No items matched.*';
                            } else {
                                resultText += `*Error: ${response.status}*`;
                            }
                        } else {
                            const top3 = response.results.slice(0, 3).map(r => `${r.name} (${r.category}, ₹${r.price_inr})`).join(' | ');
                            resultText += top3;
                            if (response.results.length === 0) resultText += '*No items returned.*';
                        }
                        
                        console.log(resultText);
                    } catch (e) {
                         console.log(`Error testing ${rel} - ${occasion}: ${e.message}`);
                    }
                }
            }
        }
    }
}

// Wait for dev server to boot
setTimeout(runTests, 2000);
