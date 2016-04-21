import Helpers = require('../../../core/src/app/utils/helpers');
import MathUtil = require('../../../core/src/app/utils/math');

export interface Clock {
        lastTickMs: number;
        lastTickGameMs: number;
        timeFactor: number;
}

export function createClock (timeFactor: number)
{
        const lastTickMs = Date.now();
        const lastTickGameMs = lastTickMs;
        return { lastTickMs, lastTickGameMs, timeFactor };
}

export function tick (clock: Clock)
{
        const timestampMs = Date.now();

        const timeFactor = clock.timeFactor;
        const deltaMs = ((timestampMs - clock.lastTickMs) * timeFactor);
        const lastTickGameMs = clock.lastTickGameMs + deltaMs;

        return { lastTickMs: timestampMs, lastTickGameMs, timeFactor };
}

export function gameTimeMs (clock: Clock)
{
        return clock.lastTickGameMs;
}

export function displayGameTime (clock: Clock)
{
        const timeMs = gameTimeMs(clock);
        const date = new Date(timeMs);
        return date.toUTCString();
}

export function tickFaster (clock: Clock)
{
        const temp = Math.round(clock.timeFactor * 60);
        const timeFactor = MathUtil.inRange(1, 3600, temp);
        return Helpers.assign(clock, { timeFactor });
}

export function tickSlower (clock: Clock)
{
        const temp = Math.round(clock.timeFactor / 60);
        const timeFactor = MathUtil.inRange(1, 3600, temp);
        return Helpers.assign(clock, { timeFactor });
}

export function addOffset (clock: Clock, offsetMs: number)
{
        const lastTickGameMs = clock.lastTickGameMs + offsetMs;
        return Helpers.assign(clock, { lastTickGameMs });
}
