import type { Controller } from "../LoadControllers.js";

export default class CategoriController implements Controller{
    
    create = (): string => {
        return `Category created successfully.`;
    };

    update = (): string => {
        return `Category updated successfully.`;
    };

    delete = (): string => {
        return `Category deleted successfully.`;
    };

}