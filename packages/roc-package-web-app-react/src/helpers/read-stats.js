import { getSettings, getAbsolutePath } from 'roc';

/**
 * Read stats from build
 *
 * @param {string} stats - Path to a stats file from the client build
 * @returns {object} The stats object in the stats file
 */
export default function readStats(stats) {
    const settings = getSettings('runtime');

    return require(getAbsolutePath(stats || settings.stats));
}
