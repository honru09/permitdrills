/* PermitDrills quiz engine — practice + exam simulator, vanilla JS.
   Payload: <script type="application/json" id="pd-bank">{mode, slug, exam, topics, questions}</script> */
(function () {
  var el = document.getElementById('pd-bank');
  if (!el) return;
  var DATA = JSON.parse(el.textContent);
  var root = document.getElementById('quiz-root');
  var LANGS = ['zh', 'en'];
  var lang = localStorage.getItem('pd-lang') || 'zh';
  if (LANGS.indexOf(lang) < 0) lang = 'zh';

  var T = {
    zh: {
      practice: '练习模式', exam: '模拟考试', all: '全部专题', next: '下一题', finish: '完成',
      correct: '回答正确', wrong: '回答错误', correctAnswer: '正确答案', source: '出处',
      progress: '进度', score: '成绩', restart: '再练一次', goExam: '去模拟考试',
      question: '第', of: '/', start: '开始', submit: '交卷', timeLeft: '剩余时间',
      passed: '达到官方及格线', failed: '未达到官方及格线', officialMark: '官方及格线',
      yourScore: '你的成绩', review: '逐题回顾', topicBreakdown: '分专题成绩',
      unanswered: '未作答', answeredCount: '已答', premiumTitle: '想要完整题库 + 错题本？',
      premiumBody: 'Premium 即将推出：全部专题精练、错题自动收集、考前速记表。一次付费，终身使用。',
      premiumCta: '看看 Premium', seenProgress: '本站练习记录', done: '已练', right: '答对',
      shuffleStart: '开始练习', pickTopic: '先选一个专题（或全部），点开始。题目顺序每次随机。',
      examIntro: '按官方格式：共 {n} 题{pass}，{time}。考试中不显示对错，交卷后出成绩报告。',
      noTime: '不限时', min: '分钟', needCorrect: '答对 {p} 题及格', percent: '正确率',
      prev: '上一题', questionNav: '题目导航', confirmSubmit: '还有未答题目，确定交卷吗？', topic: '专题',
    },
    en: {
      practice: 'Practice mode', exam: 'Exam simulator', all: 'All topics', next: 'Next question', finish: 'Finish',
      correct: 'Correct', wrong: 'Not quite', correctAnswer: 'Correct answer', source: 'Source',
      progress: 'Progress', score: 'Score', restart: 'Practice again', goExam: "Take the exam simulator",
      question: 'Question', of: 'of', start: 'Start', submit: 'Submit exam', timeLeft: 'Time left',
      passed: 'At or above the official pass mark', failed: 'Below the official pass mark', officialMark: 'Official pass mark',
      yourScore: 'Your score', review: 'Review every question', topicBreakdown: 'Score by topic',
      unanswered: 'Unanswered', answeredCount: 'answered', premiumTitle: 'Want the full bank + a mistake notebook?',
      premiumBody: 'Premium is coming: every topic drilled, automatic mistake collection, a pre-test cram sheet. One payment, yours for life.',
      premiumCta: 'See Premium', seenProgress: 'Your practice on this device', done: 'practiced', right: 'correct',
      shuffleStart: 'Start practicing', pickTopic: 'Pick a topic (or all of them) and start. Question order is shuffled each time.',
      examIntro: 'Official format: {n} questions{pass}, {time}. No feedback until you submit — then a full score report.',
      noTime: 'untimed', min: 'minutes', needCorrect: '{p} correct to pass', percent: 'accuracy',
      prev: 'Previous', questionNav: 'Questions', confirmSubmit: 'Some questions are unanswered. Submit anyway?', topic: 'Topic',
    },
  };
  function t(k) { return T[lang][k] || T.zh[k] || k; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function topicName(id) { var m = DATA.topics[id]; return m ? (lang === 'zh' ? m.zh : m.en) : id; }

  function langSeg() {
    return '<span class="seg" role="group" aria-label="language">' +
      LANGS.map(function (l) { return '<button data-lang="' + l + '" class="' + (l === lang ? 'on' : '') + '">' + (l === 'zh' ? '中文' : 'EN') + '</button>'; }).join('') + '</span>';
  }
  function bindLangSeg() {
    root.querySelectorAll('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        lang = b.getAttribute('data-lang');
        localStorage.setItem('pd-lang', lang);
        render();
      });
    });
  }

  /* ---------------- practice ---------------- */
  var P = { topic: 'all', list: [], idx: 0, picked: -1, revealed: false, sessionRight: 0 };
  function progressKey() { return 'pd-progress-' + DATA.slug; }
  function getProgress() { try { return JSON.parse(localStorage.getItem(progressKey()) || '{}'); } catch (e) { return {}; } }
  function saveAnswer(q, ok) {
    var p = getProgress();
    p[q.topic] = p[q.topic] || { done: 0, right: 0 };
    p[q.topic].done += 1; if (ok) p[q.topic].right += 1;
    p[q.id] = ok ? 1 : 0;
    localStorage.setItem(progressKey(), JSON.stringify(p));
  }
  function practicePool() {
    return DATA.questions.filter(function (q) { return P.topic === 'all' || q.topic === P.topic; });
  }
  function startPractice() {
    P.list = shuffle(practicePool().slice());
    P.idx = 0; P.picked = -1; P.revealed = false; P.sessionRight = 0;
    render();
  }
  function renderPractice() {
    var counts = {};
    DATA.questions.forEach(function (q) { counts[q.topic] = (counts[q.topic] || 0) + 1; });
    var chips = ['all'].concat(Object.keys(DATA.topics)).map(function (id) {
      var label = id === 'all' ? t('all') : topicName(id);
      var n = id === 'all' ? DATA.questions.length : (counts[id] || 0);
      return '<button class="opt" style="min-height:44px;width:auto;display:inline-flex;padding:9px 14px;' + (P.topic === id ? 'border-color:var(--navy);background:#eef2fa;' : '') + '" data-topic="' + id + '">' + label + ' · ' + n + '</button>';
    }).join('');
    var prog = getProgress();
    var progLines = Object.keys(DATA.topics).filter(function (id) { return prog[id] && prog[id].done; }).map(function (id) {
      return '<span class="chip gray">' + topicName(id) + '：' + t('done') + ' ' + prog[id].done + ' · ' + t('right') + ' ' + prog[id].right + '</span>';
    }).join(' ');
    var html = '<div class="quiz-toolbar">' + langSeg() + '<strong>' + t('practice') + '</strong></div>';
    html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">' + chips + '</div>';
    if (progLines) html += '<p class="small muted">' + t('seenProgress') + '： ' + progLines + '</p>';
    if (!P.list.length) {
      html += '<div class="card quiz"><p>' + t('pickTopic') + '</p><button class="btn amber" id="pd-start">' + t('shuffleStart') + '（' + practicePool().length + '）</button></div>';
      root.innerHTML = html; bindLangSeg();
      root.querySelectorAll('[data-topic]').forEach(function (b) { b.addEventListener('click', function () { P.topic = b.getAttribute('data-topic'); render(); }); });
      var st = document.getElementById('pd-start'); if (st) st.addEventListener('click', startPractice);
      return;
    }
    if (P.idx >= P.list.length) {
      var pct = P.list.length ? Math.round(100 * P.sessionRight / P.list.length) : 0;
      html += '<div class="card quiz"><p class="scoreline">' + t('score') + '：' + P.sessionRight + ' / ' + P.list.length + '（' + pct + '%）</p>' +
        '<p><button class="btn" id="pd-again">' + t('restart') + '</button> <a class="btn amber" href="../exam/">' + t('goExam') + '</a></p></div>';
      root.innerHTML = html; bindLangSeg();
      root.querySelectorAll('[data-topic]').forEach(function (b) { b.addEventListener('click', function () { P.topic = b.getAttribute('data-topic'); P.list = []; render(); }); });
      document.getElementById('pd-again').addEventListener('click', startPractice);
      return;
    }
    var q = P.list[P.idx];
    html += '<div class="quiz-layout"><div class="quiz-main"><div class="card quiz"><div class="qmeta"><span>' + t('question') + ' ' + (P.idx + 1) + ' ' + t('of') + ' ' + P.list.length + ' · ' + topicName(q.topic) + '</span><span>' + t('right') + ' ' + P.sessionRight + '</span></div>' +
      '<div class="bar" style="margin-bottom:14px"><i style="width:' + Math.round(100 * P.idx / P.list.length) + '%"></i></div>' +
      (q.sign ? '<div class="signbox" data-sign="' + q.sign + '"></div>' : '') +
      '<p class="qtext">' + esc(q.q[lang]) + '</p><div class="opts">' +
      q.options[lang].map(function (o, i) {
        var cls = 'opt';
        if (P.revealed) { if (i === q.answer) cls += ' right'; else if (i === P.picked) cls += ' wrong'; }
        else if (i === P.picked) cls += ' picked';
        return '<button class="' + cls + '" data-opt="' + i + '"' + (P.revealed ? ' disabled' : '') + '><span class="k">' + 'ABCD'[i] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>';
    if (P.revealed) {
      var ok = P.picked === q.answer;
      html += '<div class="explain ' + (ok ? 'good' : 'bad') + '"><strong>' + (ok ? '✓ ' + t('correct') : '✗ ' + t('wrong') + ' — ' + t('correctAnswer') + '：' + 'ABCD'[q.answer]) + '</strong>' +
        '<p style="margin:8px 0">' + esc(q.explanation[lang]) + '</p>' +
        '<p class="src">' + t('source') + '：' + esc(q.source.section) + ' · <a href="' + q.source.url + '" target="_blank" rel="noopener">' + (lang === 'zh' ? '官方手册' : 'Official handbook') + '</a></p></div>' +
        '<p style="margin-top:14px"><button class="btn amber" id="pd-next">' + (P.idx + 1 >= P.list.length ? t('finish') : t('next')) + '</button></p>';
    }
    html += '</div></div>';
    var pAnswered = P.idx + (P.revealed ? 1 : 0);
    var pPct = P.list.length ? Math.round(100 * pAnswered / P.list.length) : 0;
    html += '<aside class="card quiz-rail" aria-label="' + t('progress') + '"><p class="rail-label">' + t('progress') + '</p>' +
      '<p class="rail-big">' + (P.idx + 1) + ' <span>/ ' + P.list.length + '</span></p>' +
      '<div class="bar"><i style="width:' + pPct + '%"></i></div>' +
      '<div class="rail-rows">' +
      '<div class="rail-row"><span class="rk">' + t('answeredCount') + '</span><b>' + pAnswered + ' / ' + P.list.length + '</b></div>' +
      '<div class="rail-row"><span class="rk">' + t('right') + '</span><b>' + P.sessionRight + '</b></div>' +
      '<div class="rail-row"><span class="rk">' + t('topic') + '</span><b>' + topicName(q.topic) + '</b></div>' +
      '</div></aside></div>';
    root.innerHTML = html; bindLangSeg(); injectSigns();
    root.querySelectorAll('[data-topic]').forEach(function (b) { b.addEventListener('click', function () { P.topic = b.getAttribute('data-topic'); P.list = []; render(); }); });
    if (!P.revealed) {
      root.querySelectorAll('[data-opt]').forEach(function (b) {
        b.addEventListener('click', function () {
          P.picked = parseInt(b.getAttribute('data-opt'), 10);
          P.revealed = true;
          var ok2 = P.picked === q.answer;
          if (ok2) P.sessionRight += 1;
          saveAnswer(q, ok2);
          render();
        });
      });
    } else {
      document.getElementById('pd-next').addEventListener('click', function () { P.idx += 1; P.picked = -1; P.revealed = false; render(); });
    }
  }

  /* ---------------- exam ---------------- */
  var E = { list: [], idx: 0, answers: {}, started: false, submitted: false, timerId: null, left: 0 };
  function examPassLine() {
    var ex = DATA.exam;
    if (ex.passCorrect != null) return t('needCorrect').replace('{p}', ex.passCorrect);
    if (ex.passPercent != null) return ex.passPercent + '%';
    return '';
  }
  function startExam() {
    var n = Math.min(DATA.exam.questions, DATA.questions.length);
    E.list = shuffle(DATA.questions.slice()).slice(0, n);
    E.answers = {}; E.idx = 0; E.started = true; E.submitted = false;
    if (DATA.exam.timeMinutes) { E.left = DATA.exam.timeMinutes * 60; startTimer(); }
    render();
  }
  function startTimer() {
    stopTimer();
    E.timerId = setInterval(function () {
      E.left -= 1;
      var tm = document.getElementById('pd-timer');
      if (tm) { tm.textContent = fmtTime(E.left); tm.classList.toggle('warn', E.left <= 60); }
      if (E.left <= 0) { stopTimer(); submitExam(true); }
    }, 1000);
  }
  function stopTimer() { if (E.timerId) clearInterval(E.timerId); E.timerId = null; }
  function fmtTime(sec) { var m = Math.floor(sec / 60), s = sec % 60; return m + ':' + (s < 10 ? '0' : '') + s; }
  function submitExam(auto) {
    var un = E.list.filter(function (q) { return E.answers[q.id] == null; }).length;
    if (un > 0 && !auto && !window.confirm(t('confirmSubmit'))) return;
    stopTimer(); E.submitted = true; render();
  }
  function renderExam() {
    if (!E.started) {
      var ex = DATA.exam;
      var passPart = examPassLine();
      var intro = t('examIntro')
        .replace('{n}', ex.questions)
        .replace('{pass}', passPart ? (lang === 'zh' ? '，' + passPart : ', ' + passPart) : '')
        .replace('{time}', ex.timeMinutes ? ex.timeMinutes + ' ' + t('min') : t('noTime'));
      root.innerHTML = '<div class="quiz-toolbar">' + langSeg() + '<strong>' + t('exam') + '</strong></div>' +
        '<div class="card quiz"><p>' + intro + '</p><button class="btn amber" id="pd-start">' + t('start') + '</button></div>';
      bindLangSeg();
      document.getElementById('pd-start').addEventListener('click', startExam);
      return;
    }
    if (E.submitted) { renderReport(); return; }
    var q = E.list[E.idx];
    var answered = E.list.filter(function (x) { return E.answers[x.id] != null; }).length;
    var html = '<div class="quiz-toolbar">' + langSeg() + '<strong>' + t('exam') + '</strong>' +
      (DATA.exam.timeMinutes ? '<span class="chip gray">' + t('timeLeft') + ' <span class="timer" id="pd-timer">' + fmtTime(E.left) + '</span></span>' : '') +
      '<span class="chip gray">' + answered + ' / ' + E.list.length + ' ' + t('answeredCount') + '</span></div>';
    html += '<div class="quiz-layout"><div class="quiz-main"><div class="card quiz"><div class="qmeta"><span>' + t('question') + ' ' + (E.idx + 1) + ' ' + t('of') + ' ' + E.list.length + ' · ' + topicName(q.topic) + '</span></div>' +
      '<div class="bar" style="margin-bottom:14px"><i style="width:' + Math.round(100 * (E.idx + 1) / E.list.length) + '%"></i></div>' +
      (q.sign ? '<div class="signbox" data-sign="' + q.sign + '"></div>' : '') +
      '<p class="qtext">' + esc(q.q[lang]) + '</p><div class="opts">' +
      q.options[lang].map(function (o, i) {
        return '<button class="opt' + (E.answers[q.id] === i ? ' picked' : '') + '" data-opt="' + i + '"><span class="k">' + 'ABCD'[i] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>' +
      '<p style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">' +
      '<button class="btn ghost" id="pd-prev"' + (E.idx === 0 ? ' disabled style="opacity:.4"' : '') + '>' + t('prev') + '</button>' +
      '<button class="btn ghost" id="pd-nextq"' + (E.idx + 1 >= E.list.length ? ' disabled style="opacity:.4"' : '') + '>' + t('next') + '</button>' +
      '<button class="btn amber" id="pd-submit">' + t('submit') + '</button></p>' +
      '</div></div>' +
      '<aside class="card quiz-rail" aria-label="' + t('progress') + '"><p class="rail-label">' + t('progress') + '</p>' +
      '<p class="rail-big">' + answered + ' <span>/ ' + E.list.length + ' ' + t('answeredCount') + '</span></p>' +
      '<div class="bar"><i style="width:' + (E.list.length ? Math.round(100 * answered / E.list.length) : 0) + '%"></i></div>' +
      '<div class="rail-rows">' +
      '<div class="rail-row"><span class="rk">' + t('answeredCount') + '</span><b>' + answered + '</b></div>' +
      '<div class="rail-row"><span class="rk">' + t('unanswered') + '</span><b>' + (E.list.length - answered) + '</b></div>' +
      '<div class="rail-row"><span class="rk">' + t('question') + '</span><b>' + (E.idx + 1) + ' / ' + E.list.length + '</b></div>' +
      '</div>' +
      '<p class="rail-nav-title">' + t('questionNav') + '</p><div class="rail-nav">' +
      E.list.map(function (x, i) {
        return '<button data-nav="' + i + '" class="navdot' + (i === E.idx ? ' cur' : '') + (E.answers[x.id] != null ? ' done' : '') + '">' + (i + 1) + '</button>';
      }).join('') + '</div></aside></div>';
    root.innerHTML = html; bindLangSeg(); injectSigns();
    root.querySelectorAll('[data-opt]').forEach(function (b) { b.addEventListener('click', function () { E.answers[q.id] = parseInt(b.getAttribute('data-opt'), 10); render(); }); });
    root.querySelectorAll('[data-nav]').forEach(function (b) { b.addEventListener('click', function () { E.idx = parseInt(b.getAttribute('data-nav'), 10); render(); }); });
    var pv = document.getElementById('pd-prev'); if (pv) pv.addEventListener('click', function () { if (E.idx > 0) { E.idx -= 1; render(); } });
    var nx = document.getElementById('pd-nextq'); if (nx) nx.addEventListener('click', function () { if (E.idx + 1 < E.list.length) { E.idx += 1; render(); } });
    document.getElementById('pd-submit').addEventListener('click', function () { submitExam(false); });
  }
  function renderReport() {
    var right = 0; var byTopic = {};
    E.list.forEach(function (q) {
      var ok = E.answers[q.id] === q.answer;
      if (ok) right += 1;
      byTopic[q.topic] = byTopic[q.topic] || { n: 0, r: 0 };
      byTopic[q.topic].n += 1; if (ok) byTopic[q.topic].r += 1;
    });
    var ex = DATA.exam;
    var passNeed = ex.passCorrect != null ? ex.passCorrect : (ex.passPercent != null ? Math.ceil(ex.passPercent / 100 * E.list.length) : null);
    var pct = Math.round(100 * right / E.list.length);
    var verdict = passNeed == null ? '' : (right >= passNeed
      ? '<span class="chip" style="background:var(--good-bg);border-color:#bfe0cb;color:var(--good)">' + t('passed') + '</span>'
      : '<span class="chip" style="background:var(--bad-bg);border-color:#efc4c0;color:var(--bad)">' + t('failed') + '</span>');
    var html = '<div class="quiz-toolbar">' + langSeg() + '<strong>' + t('exam') + ' · ' + t('score') + '</strong></div>';
    var CIRC = 2 * Math.PI * 52;
    html += '<div class="card quiz"><div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><div class="scorering">' +
      '<svg width="118" height="118" viewBox="0 0 118 118"><circle cx="59" cy="59" r="52" fill="none" stroke="#e8e4d8" stroke-width="11"/>' +
      '<circle class="fg" id="pd-ring" cx="59" cy="59" r="52" fill="none" stroke="' + (passNeed != null && right < passNeed ? 'var(--bad)' : 'var(--good)') + '" stroke-width="11" stroke-linecap="round" stroke-dasharray="' + CIRC + '" stroke-dashoffset="' + CIRC + '" data-off="' + (CIRC * (1 - right / E.list.length)).toFixed(1) + '"/></svg>' +
      '<div class="num">' + pct + '%<small>' + right + ' / ' + E.list.length + '</small></div></div>' +
      '<div style="flex:1;min-width:200px"><p class="scoreline" style="margin:0 0 6px">' + t('yourScore') + '：' + right + ' / ' + E.list.length + '</p>' +
      (passNeed != null ? '<p style="margin:0">' + t('officialMark') + '：' + examPassLine() + '　' + '<span class="verdict" style="display:inline-block">' + verdict + '</span></p>' : '') + '</div></div>' +
      '<h3>' + t('topicBreakdown') + '</h3><table class="breakdown">' +
      Object.keys(byTopic).map(function (id) { return '<tr><td>' + topicName(id) + '</td><td>' + byTopic[id].r + ' / ' + byTopic[id].n + '</td><td>' + Math.round(100 * byTopic[id].r / byTopic[id].n) + '%</td></tr>'; }).join('') +
      '</table>' +
      '<p style="margin-top:14px"><button class="btn" id="pd-again">' + t('restart') + '</button> <a class="btn ghost" href="../practice/">' + t('practice') + '</a></p></div>';
    html += '<div class="card premium" style="margin-top:14px"><h3 style="margin-top:0">' + t('premiumTitle') + '</h3><p class="muted">' + t('premiumBody') + '</p><a class="btn amber" href="/premium/">$16.99 · ' + t('premiumCta') + '</a></div>';
    html += '<div class="card" style="margin-top:14px"><h3 style="margin-top:0">' + t('review') + '</h3>' +
      E.list.map(function (q, i) {
        var mine = E.answers[q.id]; var ok = mine === q.answer;
        return '<div class="reviewq"><div class="qmeta"><span>' + (i + 1) + '. ' + topicName(q.topic) + '</span><span>' + (ok ? '✓' : '✗') + '</span></div>' +
          (q.sign ? '<div class="signbox" data-sign="' + q.sign + '"></div>' : '') +
          '<p style="font-weight:650;margin:4px 0">' + esc(q.q[lang]) + '</p>' +
          '<p class="small" style="margin:4px 0">' + t('correctAnswer') + '：' + 'ABCD'[q.answer] + '. ' + esc(q.options[lang][q.answer]) + (mine == null ? '（' + t('unanswered') + '）' : '') + '</p>' +
          '<p class="small" style="margin:4px 0">' + esc(q.explanation[lang]) + '</p>' +
          '<p class="src">' + t('source') + '：' + esc(q.source.section) + ' · <a href="' + q.source.url + '" target="_blank" rel="noopener">' + (lang === 'zh' ? '官方手册' : 'Official handbook') + '</a></p></div>';
      }).join('') + '</div>';
    root.innerHTML = html; bindLangSeg(); injectSigns();
    var ring = document.getElementById('pd-ring');
    if (ring) requestAnimationFrame(function () { requestAnimationFrame(function () { ring.style.strokeDashoffset = ring.getAttribute('data-off'); }); });
    document.getElementById('pd-again').addEventListener('click', function () { E.started = false; E.submitted = false; render(); });
  }

  /* Sign artwork is server-rendered once per page into a hidden #pd-signbank
     (one span per sign id); the quiz clones from there. */
  function injectSigns() {
    var bank = document.getElementById('pd-signbank');
    if (!bank) return;
    root.querySelectorAll('[data-sign]').forEach(function (box) {
      var src = bank.querySelector('[data-signbank="' + box.getAttribute('data-sign') + '"]');
      if (src) box.innerHTML = src.innerHTML;
    });
  }

  function render() { if (DATA.mode === 'exam') renderExam(); else renderPractice(); }
  render();
})();
