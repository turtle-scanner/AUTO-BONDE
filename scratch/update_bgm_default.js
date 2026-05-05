const fs = require('fs');
const path = 'c:\\3.bonde web\\v6_terminal\\components\\BGMPlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

// Set default track to 6 (DRAGONFLY)
content = content.replace('const [currentTrack, setCurrentTrack] = useState(0);', 'const [currentTrack, setCurrentTrack] = useState(6);');

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated BGMPlayer default track');
