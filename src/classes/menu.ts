export class Menu {
  id: number;
  left: number;
  top: number;
  currentValue: string;

  constructor(id: number, x: number, y: number, currentValue: string) {
    this.id = id;
    this.left = x;
    this.top = y;
    this.currentValue = currentValue;
  } 

  create(ctx: any) {
    
  }

  delete(ctx: any) {

  }
}