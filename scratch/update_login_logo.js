const fs = require('fs');
const path = 'c:\\3.bonde web\\v6_terminal\\app\\login\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add Logo Image above the title
const logoHtml = \`
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <img src="/dragonfly4.png" alt="Dragonfly Logo" style={{ width: '80px', filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))' }} />
        </div>\`;

content = content.replace("<div style={{ marginBottom: '10px' }}>", logoHtml + "\\n        <div style={{ marginBottom: '10px' }}>");

// Ensure the login page is shown if no user is in session (it already does this as it's the login page)
// But wait, if they are already logged in and they manually go to /login, should we redirect them to /?
// Usually yes.

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated login page with logo');
