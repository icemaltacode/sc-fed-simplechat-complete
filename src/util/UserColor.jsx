import uniqolor from 'uniqolor';

const COL_SYSTEM = { color: 'rgba(156, 154, 151, 1)', isLight: true};
const COL_USER = { color: 'rgba(100, 179, 83, 1)', isLight: true};

export default function getUserColor(userType, userId = null) {
    if (userType === 'system') {
        return COL_SYSTEM;
    } else if (userType === 'user') {
        return COL_USER;
    }
    return uniqolor(userId);
}