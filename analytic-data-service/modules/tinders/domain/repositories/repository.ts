import { dso, BaseModel } from "../../../../deps.ts";

interface IRepository<T extends BaseModel> {
  findAll: (arg: any) => Promise<Array<T>>;
  insert: (arg: any) => Promise<void>;
  findOne: (arg: any) => Promise<T>;
  findById: (id: any) => Promise<T>;
  update: (obj: T) => Promise<any>;
  delete: (arg: any) => Promise<any>;
}

class Repository<T extends BaseModel> implements IRepository<T> {
  dao: any;

  constructor(x: new () => T) {
    this.dao = dso.define(x);
  }

  findAll = async (arg: any): Promise<Array<T>> => {
    return this.dao.findAll(arg);
  };

  insert = async (arg: any): Promise<void> => {
    return this.dao.insert(arg);
  };

  findOne = async (arg: any): Promise<T> => {
    return this.dao.findOne(arg);
  };

  findById = async (id: any): Promise<T> => {
    return this.dao.findById(id);
  };

  update = async (obj: T): Promise<any> => {
    return this.dao.update(obj);
  };

  delete = async (arg: any): Promise<any> => {
    return this.dao.delete(arg);
  };
}

export { IRepository, Repository };
