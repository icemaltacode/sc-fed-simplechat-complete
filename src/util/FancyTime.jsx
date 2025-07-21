import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

export default function fancyTime(time) {
    const timeAgo = new TimeAgo('en-US');
    return timeAgo.format(time, 'twitter-now');
};