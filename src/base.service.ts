import { Model } from 'mongoose';
import { NotFoundException, BadRequestException } from '@nestjs/common';

export class BaseService<T> {
  constructor(private readonly model: Model<T>) {}

  async create(createInput: any): Promise<T> {
    const newItem = new this.model(createInput);
    return (await newItem.save()) as T;
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<T> {
    const item = await this.model.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item not found with this ${id} ID`);
    }
    return item;
  }

  async update(id: string, updateInput: any): Promise<T> {
    const updatedItem = await this.model
      .findByIdAndUpdate(id, updateInput, { new: true, runValidators: true })
      .exec();
    if (!updatedItem) {
      throw new NotFoundException(`Item not found with this ${id} ID`);
    }
    return updatedItem;
  }

  async delete(id: string): Promise<T> {
    const deletedItem = await this.model.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException(`Item not found with this ${id} ID`);
    }
    return deletedItem;
  }

  async inactive(id: string): Promise<T> {
    const inactiveItem = await this.model.findByIdAndUpdate(
      id,
      { active: false },
      { new: true, runValidators: true },
    );
    if (!inactiveItem) {
      throw new NotFoundException(`Item not found with this ${id} ID`);
    }
    return inactiveItem;
  }
}
