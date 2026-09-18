export interface RadioLine {
  call: string;
  body: string;
}

const LINES: Record<string, RadioLine[]> = {
  white_oak_springs: [
    { call: "WJPS Petersburg", body: "County health says stay off the traces. Water at White Oak Springs is not to be drunk. Repeat: not to be drunk." },
    { call: "Unknown", body: "If you can hear this, the Hargrove place still has a lantern in the east window. That's the only light south of the square." },
    { call: "Deputy Miller", body: "Cellar holes are coming up hollow. Something climbed out of the old springs. Do not go down." },
  ],
  mccords_ford: [
    { call: "WJPS Petersburg", body: "Patoka's up. McCord's Ford is not a crossing tonight. Lincoln's trace is a grave." },
    { call: "Winslow fire", body: "We lost two trucks in the fog at the Horseshoe. If you see running lights in the river, they ain't ours." },
    { call: "Unknown", body: "East and West Yellow Banks meet at the ford. So do they. Don't stand in the middle." },
  ],
  stendal_backbone: [
    { call: "Mine radio", body: "Highwall at Stendal is sliding. The dragline's moving and nobody's in the cab." },
    { call: "WJPS Petersburg", body: "Peabody road's closed. If you see a helmet lamp in the pit, it is not a man." },
    { call: "Foreman McCoy", body: "We sealed the bulkhead in eighty-three. Whatever's pounding it learned the latch." },
  ],
  petersburg_square: [
    { call: "Pike Co. Sheriff", body: "Courthouse is the last dry ground in Washington Township. Sandbags on Main. No one in, no one out." },
    { call: "WJPS Petersburg", body: "This is the last broadcast from the square. If dawn comes, ring the bell." },
    { call: "Capt. Sterling, IN Guard", body: "Quarantine holds at US-41. Do not try for Dubois. Huntingburg is dark." },
  ],
  winslow_still: [
    { call: "Unknown", body: "Still-yard's lit. Mash and gasoline. Fire is the only language they understand." },
    { call: "WJPS Petersburg", body: "Winslow's gone quiet except for a two-stroke saw. If that's you, keep it running till first light." },
    { call: "Silas", body: "Don't aim for the chest. Their ribs are brittle. The jaw don't stop till the skull splits." },
  ],
};

const GENERIC: RadioLine[] = [
  { call: "Static", body: "—county line—don't cross the river—don't—" },
  { call: "WJPS Petersburg", body: "If you find a note, keep it. Somebody has to remember who lived here." },
];

export function radioFor(locationId: string, wave: number): RadioLine {
  const pool = LINES[locationId] ?? GENERIC;
  return pool[Math.abs(wave) % pool.length] ?? GENERIC[0];
}

export function deathLine(locationName: string, killer: string): string {
  if (killer === "behemoth") return `The highwall took another one at ${locationName}.`;
  if (killer === "bloater_spitter") return `Acid in the lungs. ${locationName} keeps what it swallows.`;
  if (killer === "miner_brute") return `Helmet lamp went dark at ${locationName}.`;
  if (killer === "crawler") return `Came up through a cellar hole at ${locationName}.`;
  return `Overrun at ${locationName}. Tell them we waited as long as we could.`;
}
