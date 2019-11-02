'use strict';

(function () {

  var PHOTOS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
  var DESCRIPTIONS = ['фото огонь', 'так себе настроение', 'позитивчик', 'отдыхаю'];
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у нее получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 12;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var NAMES = ['Артем', 'Вася', 'Матрена', 'Катюша', 'Слава', 'Поля'];
  var AVATARS = ['1', '2', '3', '4', '5', '6'];
  var PHOTO_ITEMS_COUNT = 25;
  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;
  var MAX_COMMENT_LENGTH = 140;

  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var bigPicture = document.querySelector('.big-picture');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var closeBigPictureButton = bigPicture.querySelector('#picture-cancel');

  var getRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var shuffleList = function (a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  var getComments = function (count) {
    var shuffledListComments = shuffleList(COMMENTS);
    var listOfComments = [];
    for (var i = 0; i < count; i++) {

      var comment = {
        avatar: 'img/avatar-' + getRandomItem(AVATARS) + '.svg',
        message: getRandomItem(shuffledListComments),
        name: getRandomItem(NAMES)
      };
      listOfComments.push(comment);
    }
    return listOfComments;
  };

  var generateListOfPhotos = function (count) {
    var shuffledListPhotos = shuffleList(PHOTOS);
    var itemsOfListOfPhotos = [];

    for (var i = 0; i < count; i++) {
      itemsOfListOfPhotos[i] = {
        url: 'photos/' + shuffledListPhotos[i] + '.jpg',
        description: getRandomItem(DESCRIPTIONS),
        likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: getComments(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS))
      };
    }
    return itemsOfListOfPhotos;
  };

  var generatePhoto = function (itemsListPhoto, i) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').id = 'templateImgId' + i;
    pictureElement.querySelector('.picture__img').src = itemsListPhoto.url;
    pictureElement.querySelector('.picture__likes').textContent = itemsListPhoto.likes;
    pictureElement.querySelector('.picture__comments').textContent = String(itemsListPhoto.comments.length);

    return pictureElement;
  };

  // функция собирает li
  var renderBigPictureComment = function (comment) {
    var socialCommentElement = socialComment.cloneNode(true);

    socialCommentElement.querySelector('.social__picture').src = comment.avatar;
    socialCommentElement.querySelector('.social__picture').alt = comment.name;
    socialCommentElement.querySelector('.social__text').textContent = comment.message;

    return socialCommentElement;
  };

  // функция собирает li в ul
  var renderListOfComments = function (listOfComments) {
    socialComments.innerHTML = '';

    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < listOfComments.length; i++) {
      commentsFragment.appendChild(renderBigPictureComment(listOfComments[i]));
    }

    return commentsFragment;
  };

  var generateBigPictureElements = function (generateListItems) {
    bigPicture.querySelector('.big-picture__img img').src = generateListItems.url;
    bigPicture.querySelector('.likes-count').textContent = generateListItems.likes;
    bigPicture.querySelector('.comments-count').textContent = String(generateListItems.comments.length);
    bigPicture.querySelector('.social__caption').textContent = generateListItems.description;
    bigPicture.querySelector('.social__comments').appendChild(renderListOfComments(generateListItems.comments));

    return bigPicture;
  };

  var generatePhotoPage = function (generateListItems) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PHOTO_ITEMS_COUNT; i++) {
      fragment.appendChild(generatePhoto(generateListItems[i], i));
    }
    picturesList.appendChild(fragment);
  };

  var photosList = generateListOfPhotos(PHOTO_ITEMS_COUNT);
  generatePhotoPage(photosList);

  // задание 4-3: Доверяй, но проверяй

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    commentsCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
    closeBigPictureButton.addEventListener('click', onCloseBigPictureButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
    document.querySelector('body').classList.add('modal-open');
    bigPicture.focus();
  };

  var getBigPictureDetails = function (photosLists, evt) {
    var bigPictureUrl = evt.target.src;
    for (var i = 0; i < photosLists.length; i++) {
      if (bigPictureUrl === photosLists[i].url) {
        return photosLists[i];
      }
    }
    return '';
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    closeBigPictureButton.removeEventListener('click', onCloseBigPictureButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.querySelector('body').classList.remove('modal-open');
  };

  var onCloseBigPictureButtonClick = function () {
    closeBigPicture();
  };

  var getBigPictureDetails = function (evt) {
    var templateImgId;

    if (evt.code === 'Enter') {
      templateImgId = evt.target.children[0].id.slice(13);
    } else {
      templateImgId = evt.target.id.slice(13);
    }

    var bigPictureDetails = {
      url: photosList[templateImgId].url,
      description: photosList[templateImgId].description,
      likes: photosList[templateImgId].likes,
      comments: photosList[templateImgId].comments
    };

    return bigPictureDetails;
  };

  var onPicturesListCLick = function (evt) {
    if (evt.target.className === 'picture__img') {
      generateBigPictureElements(getBigPictureDetails(evt));
      openBigPicture();
    }
  };

  var onPicturesListKeydown = function (evt) {
    if (evt.code === 'Enter' && evt.target.className === 'picture') {
      generateBigPictureElements(getBigPictureDetails(evt));
      openBigPicture();
    }
  };

  picturesList.addEventListener('click', onPicturesListCLick);
  picturesList.addEventListener('keydown', onPicturesListKeydown);

  // валидация поля комментария
  var onCommentsFieldChange = function () {
    if (commentsField.value.length > MAX_COMMENT_LENGTH) {
      commentsField.setCustomValidity('максимальная длина комментария 140 символов');
    } else {
      commentsField.setCustomValidity('');
    }
  };

  // задание 4-2

  // загрузка изображения и показ формы редактирования
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
  var closeButtonUploadOverlayForm = uploadOverlayForm.querySelector('#upload-cancel');
  var hashtagFieldset = uploadForm.querySelector('.img-upload__text');
  var hashtagTextField = hashtagFieldset.querySelector('input[name=hashtags]');
  var effectLevel = uploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectRadioButtons = uploadForm.querySelector('input[name=effect]');
  var effectLevelValue = uploadForm.querySelector('.effect-level__value');
  var imageUploadPreview = uploadForm.querySelector('.img-upload__preview');
  var photoEffects = uploadForm.querySelector('.img-upload__effects');
  var scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadForm.querySelector('.scale__control--value');
  var commentsField = uploadForm.querySelector('.text__description');

  var openUploadOverlayForm = function () {
    uploadOverlayForm.classList.remove('hidden');
    effectLevel.classList.add('visually-hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    closeButtonUploadOverlayForm.addEventListener('click', onCloseButtonUploadOverlayFormClick);
    hashtagTextField.addEventListener('input', onHashtagTextFieldInput);
    uploadForm.addEventListener('submit', onUploadFormSubmit);
    effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseup);
    effectRadioButton.addEventListener('change', onEffectRadioButtonsChange);
    photoEffects.addEventListener('change', onPhotoEffectsChange);
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
    scaleControlValue.setAttribute('value', '100%');
    commentsField.addEventListener('change', onCommentsFieldChange);
  };

  var closeUploadOverlayForm = function () {
    uploadFile.value = '';
    uploadOverlayForm.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    closeButtonUploadOverlayForm.removeEventListener('click', onCloseButtonUploadOverlayFormClick);
    hashtagTextField.removeEventListener('input', onHashtagTextFieldInput);
    uploadForm.removeEventListener('submit', onUploadFormSubmit);
    effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseup);
    effectRadioButton.removeEventListener('change', onEffectRadioButtonsChange);
    photoEffects.removeEventListener('change', onPhotoEffectsChange);
    scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
    commentsField.removeEventListener('change', onCommentsFieldChange);
    uploadForm.reset();
    hashtagTextField.setCustomValidity('');
    commentsField.setCustomValidity('');
  };

  var onDocumentKeydown = function (evt) {
    if (evt.code === 'Escape') {
      if (evt.target === hashtagTextField || evt.target === commentsField) {
        evt.stopPropagation();
      } else if (evt.target === commentsField) {
        evt.stopPropagation();
      } else {
        closeUploadOverlayForm();
        closeBigPicture();
      }
    }
  };

  var onUploadFileChange = function () {
    openUploadOverlayForm();
  };

  var onCloseButtonUploadOverlayFormClick = function () {
    closeUploadOverlayForm();
  };

  uploadFile.addEventListener('change', onUploadFileChange);

  //  определение ширины линии (родителя пина)
  var getWidthOfEffectLevelLine = function () {
    return effectLevelLine.getBoundingClientRect().width;
  };

  // определение позиции пина относительно левого края родителя
  var getEffectLevelPinPosition = function () {
    return effectLevelPin.offsetLeft;
  };

  // пропорция для определения уровня эффекта
  var onEffectLevelPinMouseup = function () {
    var widthOfEffectLevelLine = effectLevelLine.getBoundingClientRect().width;
    var pinPosition = effectLevelPin.offsetLeft;
    effectLevelValue.value = (pinPosition * 100) / widthOfEffectLevelLine + '%';
  };

  // сброс уровня эффекта до начального состояния (100%)
  var onEffectRadioButtonsChange = function () {
    var maxPinPosition = effectLevelLine.getBoundingClientRect().right;
    effectLevelValue.value = (maxPinPosition * 100) / maxPinPosition + '%';
  };

  // добавление класса на картинку
  var onPhotoEffectsChange = function () {
    var effects = photoEffects.elements;

    imageUploadPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');

    for (var i = 0; i < effects.length; i++) {
      if (effects[i].checked) {
        switch (effects[i].value) {
          case ('none'):
            imageUploadPreview.classList.add('effects__preview--none');
            effectLevel.classList.add('visually-hidden');
            break;
          case ('chrome'):
            imageUploadPreview.classList.add('effects__preview--chrome');
            effectLevel.classList.remove('visually-hidden');
            break;
          case ('sepia'):
            imageUploadPreview.classList.add('effects__preview--sepia');
            effectLevel.classList.remove('visually-hidden');
            break;
          case ('marvin'):
            imageUploadPreview.classList.add('effects__preview--marvin');
            effectLevel.classList.remove('visually-hidden');
            break;
          case ('phobos'):
            imageUploadPreview.classList.add('effects__preview--phobos');
            effectLevel.classList.remove('visually-hidden');
            break;
          case ('heat'):
            imageUploadPreview.classList.add('effects__preview--heat');
            effectLevel.classList.remove('visually-hidden');
            break;
        }
      }
    }
  };

  // валидация хеш-тегов
  var onUploadFormSubmit = function (evt) {
    evt.preventDefault();
    uploadForm.submit();
  };

  var onHashtagTextFieldInput = function () {
    var hashtagTextFieldContent = hashtagTextField.value;
    var hashtagsList = hashtagTextFieldContent.toLowerCase().split(' ');

    hashtagTextField.setCustomValidity('');

    if (hashtagsList.length > MAX_HASHTAGS_COUNT) {
      hashtagTextField.setCustomValidity('максимум 5 хэш-тегов');
    } else {
      for (var i = 0; i < hashtagsList.length; i++) {
        if (hashtagsList[i][0] !== '#') {
          hashtagTextField.setCustomValidity('хэш-тег начинается с символа #');
        } else if (hashtagsList[i] === '#') {
          hashtagTextField.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        } else if (hashtagsList.indexOf(hashtagsList[i]) !== i) {
          hashtagTextField.setCustomValidity('один и тот же хеш-тег не может быть использован дважды');
        } else if (hashtagsList[i].length > MAX_HASHTAG_LENGTH) {
          hashtagTextField.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        }
      }
    }
  };

  // масштабирование картинки
  var onScaleControlSmallerClick = function () {
    var currentImageSize = parseInt(scaleControlValue. value, 10);
    var setImageSize = currentImageSize - SCALE_STEP;
    if (setImageSize <= SCALE_STEP) {
      setImageSize = MIN_SCALE;
    }
    currentImageSize = setImageSize;
    changeImageSize(currentImageSize);
  };

  var onScaleControlBiggerClick = function () {
    var currentImageSize = parseInt(scaleControlValue. value, 10);
    var setImageSize = currentImageSize + SCALE_STEP;
    if (setImageSize >= MAX_SCALE) {
      setImageSize = MAX_SCALE;
    }
    currentImageSize = setImageSize;
    changeImageSize(setImageSize);
  };

  var changeImageSize = function (imageSize) {
    imageUploadPreview.classList.remove('transform:scale(0.25)', 'transform:scale(0.5)', 'transform:scale(0.75)', 'transform:scale(1)');
    imageUploadPreview.classList.add('transform' + ':' + 'scale' + '(' + imageSize / 100 + ')');
    scaleControlValue.value = imageSize + '%';
  };
})();
