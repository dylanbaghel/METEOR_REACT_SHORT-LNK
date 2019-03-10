import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform(error => {
    const customError = new Meteor.Error(400, error.message);
    return customError;
})