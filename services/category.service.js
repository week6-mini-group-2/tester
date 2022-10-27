const CategoriesRepository = require('../repositories/category.repository');

class CategoriesService {
    categoriesRepository = new CategoriesRepository();

    // createComments
    createCategory = async(name, rewards) => {
        return await this.categoriesRepository.createCategory(name, rewards);
    };

    // deleteComments
    deleteCategory = async(categoryId) => {
        return await this.categoriesRepository.deleteCategory(categoryId);
    };
    // updateComments
    updateCategory = async(categoryId, name, rewards) => {
        return await this.categoriesRepository.updateCategory(categoryId, name, rewards);
    };

    getCategory = async() => {
        return await this.categoriesRepository.getCategory();
    }
}

module.exports = CategoriesService;