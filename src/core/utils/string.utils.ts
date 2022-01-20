export function getWordCount(description: string) {
    if (description) {
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
}

export const upperFirst = (str: string = ''): string => {
    return str?.length ? str[0].toUpperCase() + str.slice(1) : '';
};

export const toSentenceCase = (str: string = '', decodeSnake: boolean = true): string => {
    // decodeSnake: To remove special characters(undersocre and dash)
    const lowerCaseStr: any = str.toLowerCase();
    return decodeSnake ? upperFirst(lowerCaseStr.replace(/_/g, ' ').replace(/-/g, ' ')) : upperFirst(lowerCaseStr);
};
