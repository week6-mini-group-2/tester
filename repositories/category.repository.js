const { Categories } = require('../models');

class CategoriesRepository{
    createCategory = async(name, rewards) => {
        const categoryInfo = await Categories.create({
            name: name,
            rewards: rewards
        });
        return categoryInfo.commentId;
    };

    updateCategory = async(categoryId, name, rewards) => {
        const updateValue = await Categories.update(
            {name : name, rewards: rewards},
            {where: {categoryId : categoryId}},
        );
        return updateValue;
    };

    deleteCategory = async(categoryId) => {
        const destroyValue = await Categories.destroy({where: {categoryId: categoryId}});
        return destroyValue;
    };

    getCategory = async() => {
        return await Categories.findAll({});
    }
}

module.exports = CategoriesRepository;