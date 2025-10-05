const { format } = require("date-fns");

const formatNotificationForEmit = async (notification, type) => {
  let userDetails = null;
  let actorField = null;

  switch(type) {
    case 'follow':
      actorField = 'followerId';
      break;
    case 'like':
      actorField = 'likerId';
      break;
    case 'comment':
      actorField = 'commentorId';
      break;
  }

  if (actorField && notification[actorField]) {
    userDetails = notification[actorField];
  }

  if (!userDetails) {
    return null;
  }

  const formattedCreatedAt = format(new Date(notification.createdAt), 'dd MMMM yyyy, hh:mm a');

  return {
    type: notification.type,
    recipeId: notification.recipeId?._id || notification.recipeId || null,
    userId: userDetails._id,
    name: userDetails.name,
    image: userDetails.image,
    createdAt: formattedCreatedAt
  };
};

module.exports = { formatNotificationForEmit };
