import { useState } from "react";
import { Weapon, Perk } from "@/types/game";
import {
  Wrench,
  Shield,
  Zap,
  Sun,
  Package,
  Flame,
  Target,
  X,
  Check,
  ShoppingCart,
} from "lucide-react";
import { soundEngine } from "@/audio/soundEngine";

interface UpgradeShopModalProps {
  weapons: Weapon[];
  perks: Perk[];
  scrap: number;
  molotovs: number;
  maxMolotovs: number;
  onClose: () => void;
  onUnlockWeapon: (weaponIndex: number) => void;
  onUpgradeWeapon: (weaponIndex: number) => void;
  onEquipWeapon: (weaponIndex: number) => void;
  equippedId?: string;
  onUpgradePerk: (perkId: string) => void;
  onBuyAmmoRefill: () => void;
  onBuyMolotov: () => void;
}

export function UpgradeShopModal({
  weapons,
  perks,
  scrap,
  molotovs,
  maxMolotovs,
  onClose,
  onUnlockWeapon,
  onUpgradeWeapon,
  onEquipWeapon,
  equippedId,
  onUpgradePerk,
  onBuyAmmoRefill,
  onBuyMolotov,
}: UpgradeShopModalProps) {
  const [activeTab, setActiveTab] = useState<"weapons" | "perks" | "supplies">("weapons");

  const getPerkIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield":
        return <Shield className="h-5 w-5 text-accent" />;
      case "Zap":
        return <Zap className="h-5 w-5 text-accent" />;
      case "Sun":
        return <Sun className="h-5 w-5 text-accent" />;
      case "Package":
        return <Package className="h-5 w-5 text-fg" />;
      case "Flame":
        return <Flame className="h-5 w-5 text-primary" />;
      case "Target":
        return <Target className="h-5 w-5 text-primary" />;
      default:
        return <Wrench className="h-5 w-5 text-muted" />;
    }
  };

  const tabs = [
    { id: "weapons" as const, label: "Arsenal" },
    { id: "perks" as const, label: "County grit" },
    { id: "supplies" as const, label: "Shed stores" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded border border-border bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-border bg-bg p-4">
          <div className="flex items-center gap-3">
            <div className="rounded border border-accent/40 bg-surface-2 p-2">
              <Wrench className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold tracking-wider text-fg md:text-2xl">
                HARGROVE SHED
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                Workbench · reload, file, distill
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded border border-border bg-surface-2 px-3 py-1.5">
              <span className="font-mono text-[10px] uppercase text-muted">Scrap </span>
              <span className="font-heading text-lg font-bold text-accent">{scrap}</span>
            </div>
            <button
              id="shop-close-btn"
              type="button"
              aria-label="Close workbench"
              title="Close workbench"
              onClick={onClose}
              className="rounded border border-border bg-surface p-2 text-muted hover:text-fg focus-visible:ring-2 focus-visible:ring-accent outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex border-b border-border bg-bg px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`shop-tab-${tab.id}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-heading text-sm font-bold uppercase tracking-wider ${
                activeTab === tab.id
                  ? "border-b-2 border-accent text-accent"
                  : "text-muted hover:text-fg"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === "weapons" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {weapons.map((wep, idx) => {
                const upgradeCost = Math.round(wep.damage * 4.5 * wep.upgradeLevel);
                const canAffordUpgrade = scrap >= upgradeCost;
                const canAffordUnlock = scrap >= wep.cost;
                return (
                  <div
                    key={wep.id}
                    className={`flex flex-col justify-between rounded border bg-bg p-4 ${equippedId === wep.id ? "border-accent" : "border-border"}`}
                  >
                    <div>
                      <div className="mb-1 flex items-start justify-between">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                            {wep.category}
                          </span>
                          <h3 className="font-heading text-lg font-bold text-fg">{wep.name}</h3>
                        </div>
                        {equippedId === wep.id ? (
                          <span className="rounded border border-accent bg-accent px-2 py-0.5 font-mono text-[10px] text-bg">
                            In hands
                          </span>
                        ) : wep.unlocked ? (
                          <span className="rounded border border-accent/40 px-2 py-0.5 font-mono text-[10px] text-accent">
                            Lv. {wep.upgradeLevel}
                          </span>
                        ) : (
                          <span className="rounded border border-primary/40 px-2 py-0.5 font-mono text-[10px] text-primary">
                            Locked
                          </span>
                        )}
                      </div>
                      <p className="mb-3 font-lore text-xs leading-relaxed text-muted">
                        {wep.description}
                      </p>
                      <div className="mb-3 grid grid-cols-3 gap-2 rounded border border-border bg-surface p-2.5 text-center">
                        <Stat n="Damage" v={Math.round(wep.damage)} />
                        <Stat n="Mag" v={wep.magazineSize} />
                        <Stat n="Rate" v={`${wep.fireRate}/s`} />
                      </div>
                    </div>
                    {wep.unlocked ? (
                      <div className="flex flex-col gap-2">
                        {equippedId !== wep.id && (
                          <button
                            id={`equip-weapon-${wep.id}`}
                            type="button"
                            onClick={() => {
                              onEquipWeapon(idx);
                              soundEngine.playPickup();
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded border border-accent bg-surface-2 px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider text-accent"
                          >
                            Put in hands
                          </button>
                        )}
                        <button
                          id={`upgrade-weapon-${wep.id}`}
                          type="button"
                          onClick={() => {
                            if (canAffordUpgrade) {
                              onUpgradeWeapon(idx);
                              soundEngine.playPickup();
                            }
                          }}
                          disabled={!canAffordUpgrade}
                          className={`flex w-full items-center justify-center gap-2 rounded border px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider ${
                            canAffordUpgrade
                              ? "border-accent bg-accent text-bg"
                              : "cursor-not-allowed border-border bg-surface-2 text-muted"
                          }`}
                        >
                          <Wrench className="h-4 w-4" />
                          File +20% · {upgradeCost} scrap
                        </button>
                      </div>
                    ) : (
                      <button
                        id={`unlock-weapon-${wep.id}`}
                        type="button"
                        onClick={() => {
                          if (canAffordUnlock) {
                            onUnlockWeapon(idx);
                            soundEngine.playPickup();
                          }
                        }}
                        disabled={!canAffordUnlock}
                        className={`flex w-full items-center justify-center gap-2 rounded border px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider ${
                          canAffordUnlock
                            ? "border-primary bg-primary text-fg"
                            : "cursor-not-allowed border-border bg-surface-2 text-muted"
                        }`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Unlock · {wep.cost} scrap
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "perks" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {perks.map((perk) => {
                const isMax = perk.level >= perk.maxLevel;
                const cost = perk.cost * (perk.level + 1);
                const canAfford = scrap >= cost && !isMax;
                return (
                  <div
                    key={perk.id}
                    className="flex flex-col justify-between rounded border border-border bg-bg p-4"
                  >
                    <div className="mb-3 flex items-start gap-3">
                      <div className="rounded border border-border bg-surface p-2.5">
                        {getPerkIcon(perk.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between">
                          <h3 className="font-heading text-base font-bold text-fg">{perk.name}</h3>
                          <span className="font-mono text-xs text-accent">
                            {perk.level}/{perk.maxLevel}
                          </span>
                        </div>
                        <p className="font-lore text-xs text-muted">{perk.description}</p>
                      </div>
                    </div>
                    <button
                      id={`upgrade-perk-${perk.id}`}
                      type="button"
                      onClick={() => {
                        if (canAfford) {
                          onUpgradePerk(perk.id);
                          soundEngine.playPickup();
                        }
                      }}
                      disabled={!canAfford}
                      className={`flex w-full items-center justify-center gap-2 rounded border px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider ${
                        isMax
                          ? "cursor-default border-accent/30 bg-surface text-accent"
                          : canAfford
                            ? "border-accent bg-accent text-bg"
                            : "cursor-not-allowed border-border bg-surface-2 text-muted"
                      }`}
                    >
                      {isMax ? (
                        <>
                          <Check className="h-4 w-4" /> Maxed
                        </>
                      ) : (
                        `Train · ${cost} scrap`
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "supplies" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col justify-between rounded border border-border bg-bg p-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded border border-border bg-surface p-2">
                    <Package className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-fg">Munitions cache</h3>
                    <p className="font-lore text-xs text-muted">
                      Full resupply for every gun you already own.
                    </p>
                  </div>
                </div>
                <button
                  id="buy-ammo-cache-btn"
                  type="button"
                  onClick={() => {
                    if (scrap >= 80) {
                      onBuyAmmoRefill();
                      soundEngine.playPickup();
                    }
                  }}
                  disabled={scrap < 80}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded border px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider ${
                    scrap >= 80
                      ? "border-accent bg-accent text-bg"
                      : "cursor-not-allowed border-border bg-surface-2 text-muted"
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Resupply · 80 scrap
                </button>
              </div>
              <div className="flex flex-col justify-between rounded border border-border bg-bg p-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded border border-primary/40 bg-surface p-2">
                    <Flame className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-fg">
                      Winslow mash bottle
                    </h3>
                    <p className="font-lore text-xs text-muted">
                      190-proof and a rag. ({molotovs}/{maxMolotovs} carried)
                    </p>
                  </div>
                </div>
                <button
                  id="buy-molotov-btn"
                  type="button"
                  onClick={() => {
                    if (scrap >= 60 && molotovs < maxMolotovs) {
                      onBuyMolotov();
                      soundEngine.playPickup();
                    }
                  }}
                  disabled={scrap < 60 || molotovs >= maxMolotovs}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded border px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider ${
                    scrap >= 60 && molotovs < maxMolotovs
                      ? "border-primary bg-primary text-fg"
                      : "cursor-not-allowed border-border bg-surface-2 text-muted"
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {molotovs >= maxMolotovs ? "Satchel full" : "Distill · 60 scrap"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-bg p-4">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Tab or Esc to close
          </span>
          <button
            id="shop-resume-battle-btn"
            type="button"
            onClick={onClose}
            className="rounded border border-accent bg-accent px-5 py-2 font-heading text-sm font-bold uppercase tracking-wider text-bg"
          >
            Back to the trace
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, v }: { n: string; v: string | number }) {
  return (
    <div>
      <span className="block font-mono text-[10px] uppercase text-muted">{n}</span>
      <span className="font-mono text-sm font-bold text-fg">{v}</span>
    </div>
  );
}
