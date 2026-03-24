const { body, param } = require('express-validator');

const contactFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

function contactIdRules() {
  return [
    param('id')
      .trim()
      .notEmpty()
      .withMessage('Contact id is required.')
      .isMongoId()
      .withMessage('Contact id must be a valid MongoDB ObjectId.')
  ];
}

function createContactRules() {
  return [
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name is required.')
      .isLength({ min: 2 })
      .withMessage('First name must be at least 2 characters long.'),
    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name is required.')
      .isLength({ min: 2 })
      .withMessage('Last name must be at least 2 characters long.'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required.')
      .isEmail()
      .withMessage('Email must be valid.')
      .normalizeEmail(),
    body('favoriteColor')
      .trim()
      .notEmpty()
      .withMessage('Favorite color is required.'),
    body('birthday')
      .trim()
      .notEmpty()
      .withMessage('Birthday is required.')
      .isISO8601()
      .withMessage('Birthday must be a valid date in YYYY-MM-DD format.'),
    body()
      .custom((value) => {
        const extraFields = Object.keys(value).filter((field) => !contactFields.includes(field));

        if (extraFields.length > 0) {
          throw new Error(`Unexpected fields: ${extraFields.join(', ')}`);
        }

        return true;
      })
  ];
}

function updateContactRules() {
  return [
    body()
      .custom((value) => {
        const keys = Object.keys(value);

        if (keys.length === 0) {
          throw new Error('Request body cannot be empty.');
        }

        const extraFields = keys.filter((field) => !contactFields.includes(field));

        if (extraFields.length > 0) {
          throw new Error(`Unexpected fields: ${extraFields.join(', ')}`);
        }

        return true;
      }),
    body('firstName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('First name cannot be empty.')
      .isLength({ min: 2 })
      .withMessage('First name must be at least 2 characters long.'),
    body('lastName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Last name cannot be empty.')
      .isLength({ min: 2 })
      .withMessage('Last name must be at least 2 characters long.'),
    body('email')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Email cannot be empty.')
      .isEmail()
      .withMessage('Email must be valid.')
      .normalizeEmail(),
    body('favoriteColor')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Favorite color cannot be empty.'),
    body('birthday')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Birthday cannot be empty.')
      .isISO8601()
      .withMessage('Birthday must be a valid date in YYYY-MM-DD format.')
  ];
}

module.exports = {
  contactIdRules,
  createContactRules,
  updateContactRules
};
