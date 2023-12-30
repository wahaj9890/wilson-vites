export const truncate = (value, length = 10) => value.substring(0, length) + '...';

// filters.js
export const formatDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const checkValue = (value) => {
    if (!value) return '-'
}

