import Product from "../model/product";

const app = require('express')();

app.get('/getAll', async (req, res): Promise<void> => {
    try {
        const categories: string[] = await Product.distinct('category');
        res.status(200).json(categories);
    } catch {
        // todo: Improve the error handling
        res.status(500);
    }
})

export default app;