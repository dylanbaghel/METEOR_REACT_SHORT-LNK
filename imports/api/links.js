import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('links', function () {
        return Links.find({
            userId: this.userId
        });
    });
}

Meteor.methods({
    'links.insert'(url) {
        if (!this.userId) {
            throw new Meteor.Error(401, "Not Authorized");
        }

        new SimpleSchema({
            url: {
                type: String,
                label: 'Your Link',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });

        Links.insert({
            _id: shortid.generate().toString(),
            url,
            userId: this.userId,
            visible: true,
            lastVisited: null,
            visitedCount: 0
        });
    },
    'links.setVisibility'(_id, visible) {
        if (!this.userId) {
            throw new Error(401, "Not Authorized");
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean
            }
        }).validate({ _id, visible });

        Links.update({
            _id,
            userId: this.userId
        }, {
            $set: {
                visible
            }
        });
    },
    'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                type: String
            }
        }).validate({ _id });

        Links.update({
            _id
        }, {
            $inc: {
                visitedCount: 1
            },
            $set: {
                lastVisited: new Date().getTime()
            }
        });
    }
});