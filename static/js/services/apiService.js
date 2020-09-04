export class ApiService {
  fetchDialogMessages() {
    return new Promise((resolve) => {
      const messages = [
        {
          time: '12:43',
          message: 'Привет, Ревьювер',
          isMy: false,
        },
        {
          time: '13:34',
          message: 'Я тут свой шаблонизатор своял ))',
          isMy: true,
        },
        {
          time: '12:43',
          message: 'Крутой опыт',
          isMy: false,
        },
        {
          time: '14:35',
          message: 'Конечно же тут одни костыли',
          isMy: true,
        },
        {
          time: '15:43',
          message: 'Но это работает',
          isMy: false,
        },
        {
          time: '16:00',
          message: 'Я старался сделать его синтаксис похожим на jsx',
          isMy: true,
        },
        {
          time: '17:12',
          message: 'Получилось что-то среднее между jsx и twig',
          isMy: false,
        },
        {
          time: '17:12',
          message:
            'Можно вызывать компоненты через тег с его именем, передавать пропсы как html атрибуты. Цыклы и условия заключаются в {%  %}. Из цыклов есть [for item in items] и закрывающий [endfor], а из условий есть [if], [elif], [endif]',
          isMy: false,
        },
        {
          time: '18:32',
          message:
            'С твигом познакомился когда подрабатывал в местной веб-студии и мне нужно было сделать магазинчик на OpenCart. Там используется этот шаблонизатор))',
          isMy: true,
        },
        {
          time: '18:43',
          message:
            'Просто не знаю что сюда еще писать, нужно чтобы выглядело как живой диалог',
          isMy: false,
        },
        {
          time: '19:00',
          message: 'По этому написал вот это всё :D',
          isMy: true,
        },
      ];

      resolve(messages);
    });
  }

  fetchDialogs() {
    return new Promise((resolve) => {
      const dialogs = [
        {
          id: 1,
          isMy: false,
          lastMessage: 'Привет, как дела?',
          background: '#3ed2dc',
          time: 'ср',
          userName: 'Жека',
          unreadCount: 1,
        },
        {
          id: 2,
          isMy: true,
          lastMessage: 'Я кодю, потом катнем',
          background: '#8492d7',
          time: '12:43',
          userName: 'Аркадий',
        },
      ];
      setTimeout(() => {
        resolve(dialogs);
      }, 500);
    });
  }
}
