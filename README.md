# BRO-GRID-BEAT

Визуальный секвенсор битов — создавай ритмы, нажимая на ячейки сетки.

## Возможности

**Звуковая библиотека**
- 8 дорожек: Kick, Snare, Hi-Hat, Clap, Tom, Perc, Bass, Synth
- 48 уникальных звуков с FM-синтезом
- Выбор звука для каждой дорожки

**Пресеты**
- Basic Beat, Trap Beat, House, Breakbeat, Hip-Hop, Techno, DnB
- Мгновенная загрузка + автовоспроизведение

**Мастер-контроль**
- Крутилки: Master, Bass, Treble, Attack, Release, Compressor, Drive
- 6-полосный эквалайзер (SUB → PRESENCE)

**Эффекты**
- Reverb с настройкой decay и wet
- Delay с настройкой времени и feedback

**Микшер**
- Громкость для каждой дорожки
- Mute / Solo
- Визуальная обратная связь

**Визуализация**
- Неоновые частицы при воспроизведении
- Анимированный спектр-анализатор
- Beat-индикатор

## Управление

| Действие | Клавиша |
|----------|---------|
| Play / Pause | `SPACE` или кнопка |
| Очистить паттерн | Кнопка CLEAR |
| Изменить звук | Клик на название дорожки |

## Запуск

Открой `index.html` в браузере (Chrome, Firefox, Edge).

```bash
# Или через локальный сервер
python -m http.server 8000
# Открой http://localhost:8000
```

## Структура

```
Bro-Grid-Beat/
├── index.html      # Главная страница
├── css/
│   └── style.css   # Стили
├── js/
│   └── main.js     # Логика приложения
└── assets/         # Ресурсы
```

## Технологии

- HTML5 + CSS3 (Cyberpunk Neon UI)
- Vanilla JavaScript
- Web Audio API (FM-синтез, эффекты)
- Canvas 2D (визуализация)

---

**Версия:** 1.2  
**Контакт:** seevaa57@gmail.com