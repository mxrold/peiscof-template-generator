const app = document.getElementById('app');
const form = document.getElementById('form');

const validateUrl = url => {
  const text = url.toLowerCase().replaceAll(' ', '-');
  const str = text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

  return `/${str}`
}

const validateDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}/${month}/${day}`;
}

const validateAuthor = author => {
  switch (author) {
    case 'hernanroldan':
      return `author: Hernán Roldán
      author_img: /images/author-hernanroldan.png
      author_description: 
      author_linkedin: 'hroldán'
      author_email: 'hernan@peiscof.com'`;
    case 'martinroldan':
      return `author: Martín Roldán
      author_img: /images/author-martinroldan.png
      author_description: 
      author_linkedin: 'martindavidroldan'
      author_email: 'martin@peiscof.com'`;
    default:
      return '';
  }
}

const generatorHtml = template => {
  const oldTemplate = document.getElementById('result-template');

  const templateContainer = document.createElement('div');
  templateContainer.className= 'result-template';
  templateContainer.id = 'result-template';

  const templateData = document.createElement('pre');
  templateData.innerHTML = template;
  templateContainer.appendChild(templateData);

  if (oldTemplate) {
    app.replaceChild(templateContainer, oldTemplate);
  } else {
    app.appendChild(templateContainer);
  }
}

const generatorTemplate = e => {
  e.preventDefault();
  const data = e.target;

  const title = data.title.value;
  const subtitle = data.subtitle.value;
  const description = data.description.value;
  const tag = data.tag.value;
  const imageUrl = data.imageUrl.value;
  const thumbUrl = data.thumbUrl.value;
  const author = data.author.value;

  const template = `
  ---
  title: ${title}
  url: ${validateUrl(title)}
  subtitle: ${subtitle}
  excerpt: >-
    ${description}
  date: '${validateDate()}'
  tag: ${tag}
  thumb_image: ${thumbUrl}
  thumb_image_alt: ${title}
  image: ${imageUrl}
  image_alt: ${title}
  ${validateAuthor(author)}
  seo:
    title: ${title}
    description: >-
      ${description}
    extra:
        - name: 'og:type'
          value: article
          keyName: property
        - name: 'og:title'
          value: ${title}
          keyName: property
        - name: 'og:description'
          value: >-
            ${description}
          keyName: property
        - name: 'og:image'
          value: ${imageUrl}
          keyName: property
          relativeUrl: true
        - name: 'twitter:card'
          value: summary_large_image
        - name: 'twitter:title'
          value: ${title}
        - name: 'twitter:description'
          value: >-
            ${description}
        - name: 'twitter:image'
          value: ${imageUrl}
          relativeUrl: true
  layout: post
  --- 
  `;

  generatorHtml(template);
}

form.addEventListener('submit', generatorTemplate);