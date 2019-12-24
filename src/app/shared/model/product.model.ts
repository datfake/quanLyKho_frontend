import { ICategory } from 'app/shared/model/category.model';
import { IBrand } from 'app/shared/model/brand.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  amount?: number;
  category?: ICategory;
  brand?: IBrand;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public price?: number,
    public amount?: number,
    public category?: ICategory,
    public brand?: IBrand
  ) {}
}
