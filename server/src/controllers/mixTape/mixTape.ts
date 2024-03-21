import { Request, Response } from 'express';
import MixTapeModel, { MixTapeType } from '../../models/mixTape';

export const createMixTape = async (req: Request, res: Response) => {
  try {
    const newMixTape = new MixTapeModel<MixTapeType>(req.body);
    const savedMixTape = await newMixTape.save();
    res.status(201).json(savedMixTape);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not create mixtape.' });
  }
};
