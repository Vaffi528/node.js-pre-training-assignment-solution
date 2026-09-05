import { mapArray, filterArray } from './array-helpers'

export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    this.items.push(entity);
    return entity;
  }

  update(id: number, patch: Partial<T>): T {
    this.items = mapArray(this.items, (item) => item.id === id ? {...item, ...patch, id} : item);
    
    const element = this.findById(id);
    if (!element) {
      throw new Error("Error in update: no such ID");
    } else {
      return element;
    }
    
  }

  remove(id: number): void {
    if (!this.findById(id)) {
      throw new Error("Error in remove: no such ID");
    }

    this.items = filterArray(this.items, (item) => item.id !== id);
  }

  findById(id: number): T | undefined {
    const validElements = filterArray(this.items, (item) => item.id === id);
    if (validElements.length === 1) {
      return validElements[0];
    }
  }

  findAll(): T[] {
    return [...this.items];
  }
}
