import errorHandler from '../../../server/helpers/error-handler';
import { NotFoundError } from '../../../server/helpers/errors';
import dbConnect from '../../../server/lib/dbConnect';
import User from '../../../server/models/User';

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;
    await dbConnect();
    switch (method) {
        case 'GET':
            try {
                const user = await User.findById(id);
                if (!user) throw new NotFoundError('User not found');
                res.status(200).json({ success: true, data: user });
            } catch (error) {
                errorHandler(error, res);
            }
            break;
        case 'DELETE':
            try {
                const deletedUser = await User.deleteOne({
                    _id: id,
                });

                if (!deletedUser?.deletedCount)
                    throw new NotFoundError('User not found');

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                errorHandler(error, req, res);
            }
            break;

        default:
            res.status(404).json({
                success: false,
                message: `Method not found for route: ${req.url}.`,
            });
            break;
    }
}
