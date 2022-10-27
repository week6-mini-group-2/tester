const CategoriesService = require('../services/category.service');

class CategoriesController {
    categoriesService = new CategoriesService();

    createCategory = async(req, res, next) => {
        try {
            const { name, rewards } = req.body;

            const categoryInfo = await this.categoriesService.createCategory(name, rewards);

            res.status(200).json({result: categoryInfo, msg: "카테고리 작성을 성공하였습니다.", accessToken: req.app.locals.accessToken,});
        } catch (error) {
            res.status(400).send(error);
        }
    };

    deleteCategory = async(req, res, next) => {
        try {
            const { categoryId } = req.params;
            await this.categoriesService.deleteCategory(categoryId);
            res.status(200).json({ msg:"카테고리가 삭제되었습니다.", accessToken: req.app.locals.accessToken,});    
        } catch (error) {
            res.status(400).send(error);
        }
    };

    updateCategory = async(req, res, next) => {
        try {
            const { categoryId } = req.params;
            const { name, rewards } = req.body;
            const updateValue = await this.categoriesService.updateCategory(categoryId, name, rewards);

            res.status(200).json({msg:"카테고리가 수정되었습니다.", accessToken: req.app.locals.accessToken,});    
        } catch (error) {
            res.status(400).send(error);
        }
    };

    getCategory = async(req, res, next) => {
        try {
            const categoryInfo = await this.categoriesService.getCategory();
            res.status(200).json({result: categoryInfo, accessToken: req.app.locals.accessToken,}) 
        } catch (error) {
            res.status(400).send(error);
        }
    }

}

module.exports = CategoriesController;