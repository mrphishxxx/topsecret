import Core = require('./core');
import Br = Core.Br;
import P = Core.P;

export function wrapInLabel (label: string, value: string)
{
        return `${label}: ${value}`;
}

export function createBody (body: string)
{
        const paragraphs = body.split('\n\n');
        const sections = paragraphs.map(text => text.split('\n'));
        return paragraphs.map(text => {
                const sections = text.split('\n');
                const breaks = sections.reduce((result, section, index) => {
                        result.push(section, Br());
                        return result;
                }, []);
                const quoted = sections[0][0] === '>';
                const props = quoted ? { className: 'quoted' } : {};
                return P(props, ...breaks);
        });
}
