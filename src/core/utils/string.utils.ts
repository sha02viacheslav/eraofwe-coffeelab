export const trimCharRight = (str: string, char: string): string => {
    const regex = new RegExp(`${char}+$`, 'gi');
    return str.replace(regex, '');
};

export const getJustText = (content: any): string => {
    const contentElement = document.createElement('div');
    contentElement.innerHTML = content;
    const images = contentElement.querySelectorAll('img');
    images.forEach((image) => {
        image.parentNode.removeChild(image);
    });
    return contentElement.textContent;
};
