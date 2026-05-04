const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

function convertSafe(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            convertSafe(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const buffer = fs.readFileSync(fullPath);
            let text = buffer.toString('utf8');
            if (text.includes('')) {
                // It means it was not valid UTF-8, so it's probably EUC-KR
                text = iconv.decode(buffer, 'euc-kr');
                fs.writeFileSync(fullPath, text, 'utf8');
                console.log(`Converted: ${fullPath}`);
            }
        }
    }
}

convertSafe('app');
convertSafe('components');
