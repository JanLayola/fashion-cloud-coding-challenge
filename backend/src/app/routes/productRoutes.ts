import Product, { IProduct } from "../model/product";

const app = require('express')();

app.get('/getAll', _getProducts(), async (req, res): Promise<void> => {
    res.json(res.paginatedResults)
})

function _getProducts() {
    return async (req, res, next): Promise<void> => {
        const page: number = parseInt(req.query.page);
        const limit: number = parseInt(req.query.limit) || 0;
        const skipIndex: number = (page - 1) * limit;

        const brandName: string = req.query.brand || null;
        const category: string = req.query.category || null;
        const sortBy: string = req.query.sortBy || 'stock';
        const sortDirection: string = req.query.sortDir || -1;

        try {
            const results: IProduct[] = await _filterSortAndPaginateResults(
                { limit, skipIndex, brandName, category, sortBy, sortDirection }
            )
            const numberOfTotalResults: number = await _countTotalItems({brandName, category});
            const pages: number = _getTotalPages(limit, numberOfTotalResults);

            res.paginatedResults = {results, pages, totalResults: numberOfTotalResults};
            next();
        } catch {
            // todo: Improve the error handling
            res.status(500).json({ message: "Server internal error" });
        }
    };
}

async function _filterSortAndPaginateResults({ limit, skipIndex, brandName, category, sortBy, sortDirection }): Promise<IProduct[]> {
    let filter: { brand?: string, category?: string } = {};

    if (brandName) filter.brand = brandName;
    if (category) filter.category = category;

    return await Product.find(filter)
        .sort({[sortBy]: sortDirection})
        .limit(limit)
        .skip(skipIndex)
        .exec() as IProduct[];
}

async function _countTotalItems({brandName, category}): Promise<number> {
    let filter: { brand?: string, category?: string } = {};

    if (brandName) filter.brand = brandName;
    if (category) filter.category = category;

    return await Product.find(filter).count();
}

function _getTotalPages(pageDisplayedItems, totalItems): number {
    if (!pageDisplayedItems) {
        return 1;
    }

    return Math.ceil(totalItems / pageDisplayedItems);
}

export default app;