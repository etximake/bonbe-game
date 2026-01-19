import { STORAGE_KEY } from "../Constants.js";

class DataManager {
  constructor() {
    this.items = [];
    this.state = {
      gold: 0,
      equippedId: "axe_wood",
      ownedIds: ["axe_wood"],
    };
  }

  loadItems(items) {
    this.items = Array.isArray(items) ? items : [];
  }

  loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      this.state = {
        gold: parsed.gold ?? 0,
        equippedId: parsed.equippedId ?? "axe_wood",
        ownedIds: parsed.ownedIds ?? ["axe_wood"],
      };
    } catch (error) {
      console.warn("Failed to parse saved state", error);
    }
  }

  saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }

  getItems() {
    return this.items;
  }

  getItemById(id) {
    return this.items.find((item) => item.id === id);
  }

  getEquippedItem() {
    return this.getItemById(this.state.equippedId) ?? this.items[0];
  }

  isOwned(id) {
    return this.state.ownedIds.includes(id);
  }

  equip(id) {
    if (!this.isOwned(id)) {
      return false;
    }

    this.state.equippedId = id;
    this.saveState();
    return true;
  }

  addGold(amount) {
    this.state.gold = Math.max(0, this.state.gold + amount);
    this.saveState();
  }

  canAfford(cost) {
    return this.state.gold >= cost;
  }

  purchase(id) {
    const item = this.getItemById(id);
    if (!item || this.isOwned(id) || !this.canAfford(item.price)) {
      return false;
    }

    this.state.gold -= item.price;
    this.state.ownedIds = [...this.state.ownedIds, id];
    this.state.equippedId = id;
    this.saveState();
    return true;
  }
}

const dataManager = new DataManager();
export default dataManager;
