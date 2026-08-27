import { StoryData, TimelineEvent, MemoryPhoto } from '../types';

export const storyData: StoryData = {
  husbandName: 'محمود',
  wifeName: 'آية',
  tagline: 'حكاية بدأت بنظرة… وبقت عمر بحاله.',
  
  firstLookDate: '13 يونيو 2020',
  engagementDate: '03 يوليو 2020',
  katbKetabDate: '02 أكتوبر 2020',
  weddingDate: '12 فبراير 2021',
  currentDate: '27 أغسطس 2026',
  firstLookImage: 'https://lh3.googleusercontent.com/d/1rzrA-pIoPUwgRl1_9mr-caG-PWiCALjY',

  durations: {
    firstLookToCurrent: {
      text: '6 سنين وشهرين و14 يوم',
      days: '2,266 يوم',
    },
    engagementToCurrent: {
      text: '6 سنين وشهر و24 يوم',
      days: '2,246 يوم',
    },
    katbKetabToCurrent: {
      text: '5 سنين و10 شهور و25 يوم',
      days: '2,155 يوم',
    },
    weddingToCurrent: {
      text: '5 سنين و6 شهور و15 يوم',
      days: '2,022 يوم',
    },
    firstLookToWedding: {
      days: '244 يوم',
    },
  },

  loveLetter: {
    salutation: 'حبيبتي ومراتي ونور عيني آية،',
    paragraphs: [
      'فاكرة يوم 13 يونيو 2020؟ كانت مجرد نظرة عادية ما حسبتلهاش أي حساب، بس من أول ثانية خطفتي قلبي، ومن ساعتها وحياتي كلها اتغيرت وبدأت بجد.',
      'مشينا سوا خطوة بخطوة؛ خطوبتنا في 3 يوليو، وكتب كتابنا في 2 أكتوبر، لحد يوم فرحنا في 12 فبراير 2021… اليوم اللي بدأ فيه بيتنا وعمرنا سوا.',
      'أكتر من 5 سنين عدوا تحت سقف واحد بكل حكاياتهم وضحكتنا وتعبنا. كل يوم بصحى وألاقيكي جنبي بحمد ربنا من كل قلبي إنك نصيبي وراحتي وبيتي.',
      'كل اللي فات كان جميل، بس متأكد إن اللي جاي معاكي هيكون أحلى وأجمل بكتير.'
    ],
    closing: 'حبيبك وجوزك اللي اختارك من أول نظرة.. وهيفضل يختارك كل يوم.',
    signatureName: 'محمود',
    signatureRole: 'جوز آية وحبيبها',
  },
  
  audioUrl: '', // Web Audio synth provided with soothing vintage melody
};

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'first-look',
    date: '13 يونيو 2020',
    dateRaw: '2020-06-13',
    title: 'أول نظرة',
    subtitle: 'اليوم اللي شوفتك فيه لأول مرة.. وقلبي عرف إنك إنتي الحكاية.',
    daysIntervalText: '20 يوم',
    badge: 'البداية'
  },
  {
    id: 'engagement',
    date: '03 يوليو 2020',
    dateRaw: '2020-07-03',
    title: 'يوم خطوبتنا',
    subtitle: 'أول خطوة ووعد رسمي إننا هنكمّل سوا.',
    daysIntervalText: '91 يوم',
    badge: 'الوعد'
  },
  {
    id: 'katb-ketab',
    date: '02 أكتوبر 2020',
    dateRaw: '2020-10-02',
    title: 'كتب كتابنا',
    subtitle: 'يوم ما اسمي ارتبط باسمك رسمي وبقيتي حلالي.',
    daysIntervalText: '133 يوم',
    badge: 'العهد'
  },
  {
    id: 'wedding',
    date: '12 فبراير 2021',
    dateRaw: '2021-02-12',
    title: 'يوم فرحنا',
    subtitle: 'اليوم اللي اتجمعنا فيه في بيتنا وبدأنا حياتنا مع بعض.',
    daysIntervalText: '2,022 يوم جواز',
    badge: 'بيتنا سوا'
  },
];

export const memoryPhotos: MemoryPhoto[] = [
  {
    id: 'memory-1',
    placeholderType: 'firstPhoto',
    title: 'أول نظرة',
    caption: 'من هنا بدأت كل حاجة',
    date: '13 يونيو 2020',
    imageSrc: 'https://lh3.googleusercontent.com/d/1rzrA-pIoPUwgRl1_9mr-caG-PWiCALjY',
    rotation: -2.5,
  },
  {
    id: 'memory-2',
    placeholderType: 'engagementPhoto',
    title: 'يوم الخطوبة',
    caption: 'أول وعد بيننا',
    date: '03 يوليو 2020',
    imageSrc: 'https://lh3.googleusercontent.com/d/10CRHhi2AETg2V2jAK6DECKFKn6Xl16ZN',
    rotation: 3,
  },
  {
    id: 'memory-3',
    placeholderType: 'katbKetabPhoto',
    title: 'كتب الكتاب',
    caption: 'وبقيتي مراتي رسمي',
    date: '02 أكتوبر 2020',
    imageSrc: 'https://lh3.googleusercontent.com/d/1twDiB9nnNz00nPxyEi9jqGK7-1WOaIm7',
    rotation: -1.8,
  },
  {
    id: 'memory-4',
    placeholderType: 'weddingPhoto',
    title: 'يوم الفرح',
    caption: 'وبدأ بيتنا وعمرنا سوا',
    date: '12 فبراير 2021',
    imageSrc: 'https://lh3.googleusercontent.com/d/1xksGsg1u5TaBUWrCBmkNMQnsxI9FCHBt',
    rotation: 2.2,
  },
];
