type DIEvent = {
  imgSrc: string
  title: string
  description: string
}

export const events: DIEvent[] = [
  {
    imgSrc: 'images/adalovelance.png',
    title: 'Ada Lovelance',
    description:
      'Girls aged 14-16 from a range of schools were invited to the Guardian’s Education Centre for a day of events and' +
      ' workshops designed to give them insight into working in technology. The students found out about career paths, ' +
      'took a tour of our Digital department and took part in coding, UX and data workshops.'
  },
  {
    imgSrc: 'images/home-about-gnm.png',
    title: 'The Future of Journalism in the Age of Technology',
    description:
      'With the rise of technology in the media from artificial intelligence to virtual reality, the Guardian Newspaper' +
      " and UKBlackTech came together for an evening of open discussion on 'The Future of Journalism in the Age of Technology'. " +
      'Thought leaders and experts shared their insights on how tech is transforming journalism and representation.'
  },
  {
    imgSrc: 'images/home-about-gnm.png',
    title: 'Code Your Future Homework Club',
    description:
      'Members of the Engineering team hosted a homework club for students of Code Your Future, an organisation supporting ' +
      'refugees and disadvantaged individuals with the aspiration of becoming developers.'
  }
]
