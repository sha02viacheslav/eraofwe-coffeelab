export const trimCharRight = (str: string, char: string): string => {
    const regex = new RegExp(`${char}+$`, 'gi');
    return str.replace(regex, '');
};
export function getWordCount(description: string) {
    description = description.trim();
    const regex = />([^<]+)</g;
    let m;
    let plainString = '';
    // tslint:disable-next-line:no-conditional-assignment
    while ((m = regex.exec(description)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        plainString += m[1];
        plainString += ' ';
    }
    plainString = plainString || description;
    // tslint:disable-next-line
    plainString = plainString.replace(/&nbsp;/gi, ' ').replace(/ +(?= )/g, '');
    plainString = plainString.trim();
    return plainString;
}
