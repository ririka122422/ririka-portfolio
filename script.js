/* =====================
   子午計畫譜面表資料
   ─ 維護說明 ─
   每個角色一個 group。songs 陣列中：
     name              歌曲名稱（必填）
     easy/normal/hard  該難度等級（數字）；未做 = 不寫該欄位（會顯示 —）
   ===================== */
const MERIDIAN_CHART_DATA = [
  {
    char: '浠 Mizuki',
    songs: [
      { name: '未知未踏アルスハイル' },
      { name: 'Day by Day' },
      { name: '申戀題' },
      { name: '桜華残響', easy: 5, normal: 8, hard: 10 },
      { name: 'Siɹən', hard: 11 },
      { name: '潜水花', hard: 9 },
    ],
  },
  {
    char: '汐 Seki',
    songs: [
      { name: '信號 Signal' },
      { name: '夏夢 Summer Dream' },
    ],
  },
  {
    char: '響 Hibiki',
    songs: [
      { name: '響念 Missing' },
    ],
  },
  {
    char: '霓 NEO(n)',
    songs: [
      { name: '霓光 NeonLight', easy: 3, normal: 5, hard: 7 },
      { name: '戀夏 Summer', easy: 4, normal: 6, hard: 8 },
    ],
  },
  {
    char: '澪 Rei',
    songs: [
      { name: '漫夜 Sleepless', easy: 2 },
    ],
  },
  {
    char: '煌 Kirali',
    songs: [
      { name: 'Liar 謊癮', easy: 2, hard: 6 },
    ],
  },
  {
    char: '扉暮 IANVS',
    songs: [
      { name: '暮光 Gloaming Light', hard: 8 },
    ],
  },
  {
    char: '玥 Itsuki',
    songs: [
      { name: '情緒廢物 Emotional Waste' },
    ],
  },
  {
    char: '朔 Sakuro',
    songs: [
      { name: '迷醉 Sangria' },
    ],
  },
];

function diffCell(value, diffClass) {
  if (value === undefined || value === null) return '<td>—</td>';
  return `<td class="diff-${diffClass}">${value}</td>`;
}

function renderMeridianChart(data) {
  const rows = data.flatMap(group =>
    group.songs.map((song, i) => {
      const charCell = i === 0
        ? `<td class="chart-char" rowspan="${group.songs.length}">${group.char}</td>`
        : '';
      return `<tr>${charCell}<td class="chart-song">${song.name}</td>${diffCell(song.easy, 'easy')}${diffCell(song.normal, 'normal')}${diffCell(song.hard, 'hard')}</tr>`;
    })
  ).join('');

  return `<table class="chart-table">
    <thead><tr><th>角色</th><th>歌曲</th><th>Easy</th><th>Normal</th><th>Hard</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

/* =====================
   Works Data
   ─ 維護說明 ─
   每件作品都使用統一的 sections schema。完整 schema 請見 README.md。
   欄位：
     id              作品唯一 ID（kebab-case 英文）
     title           顯示名稱
     category        'game' | 'exhibition' | 'music'
     date            日期字串（'2025.01' 等格式）
     tags            標籤陣列
     thumbnail       卡片縮圖路徑（可為 null）
     primaryVideo    主要影片 { type: 'yt'|'drive', id, label }（可為 null）
     extraVideos     其他影片陣列
     sections        內容區塊陣列：[{ heading?, text?, html?, images? }, ...]
   ===================== */
const WORKS = [

  /* ── 遊戲製作 ───────────────────────────────── */
  {
    id: 'meridian',
    title: '子午計畫主題音遊',
    category: 'game',
    date: '2025.01',
    tags: ['節奏遊戲', '2D', 'Unity', 'Vtuber', '手機遊戲'],
    thumbnail: '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_抽卡畫面.jpg',
    primaryVideo: { type: 'yt', id: 'xeerf-Wdafk', label: 'Demo 影片' },
    extraVideos: [],
    sections: [
      {
        heading: '遊戲概要',
        text: '以子午計畫旗下虛擬偶像原創曲為主題製作的二創節奏手機遊戲，適用於 Android 手機與平板觸控設備。為學生課程期末作業之 Demo 作品，不含任何營利行為，目標玩家群設定為子午計畫觀眾及音遊愛好者。',
        images: [
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_選歌畫面1.png',
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_選歌畫面2.png',
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_風格化首頁_阿基.png',
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_風格化首頁_租咪.png',
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_風格化首頁_小零.png',
        ],
      },
      {
        heading: '遊戲玩法',
        text: '玩家扮演頻道管理員，依照音樂節拍點擊下落的 Node 協助 Vtuber 完成歌唱演出。判定分為 NEON（最準）、GLOW（微差）、VOID（不準）三段，演出結果有 LIVE FINISH、FULL COMBO、MARVELOUS NEON 三種等級。',
        images: [
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_結算畫面1.jpg',
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_結算畫面2.jpg',
        ],
      },
      {
        heading: '遊戲迴圈',
        text: '演出結算 SC 資金後，玩家可升級配備或開拓收益平台，獲得更多資金並解鎖新角色；同時支援玩家自製譜面並與他人分享，延伸遊戲壽命。',
        images: [
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_養成系統1.png',
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_養成系統2.png',
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_抽卡系統1.png',
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_抽卡系統2.jpg',
        ],
      },
      {
        heading: '角色與世界觀',
        text: '採用日系美術風格，角色具備細緻設定與背景故事，並搭配劇情系統展開虛擬偶像養成互動。',
        images: [
          '作品集素材/子午計畫主題音遊/阿基_立繪.png',
          '作品集素材/子午計畫主題音遊/租咪_立繪.png',
          '作品集素材/子午計畫主題音遊/小零_立繪.png',
          '作品集素材/子午計畫主題音遊/遊戲截圖/遊戲截圖_劇情系統.png',
          '作品集素材/子午計畫主題音遊/背景圖.png',
        ],
      },
      {
        heading: '開發資訊',
        text: '5 人團隊歷時 4 週完成，使用 Unity 開發，於 2025/01/06 完成 Demo。另開發簡易譜面編輯器供玩家自製並匯出譜面。個人擔任主要程式設計，負責核心節奏判定系統、角色解鎖機制及譜面編輯器實作；遊戲 UX 由組員共同參考《世界計畫》《少女樂團派對》等音遊規劃而成。',
        images: [
          '作品集素材/子午計畫主題音遊/簡易譜面編輯器截圖1.jpg',
          '作品集素材/子午計畫主題音遊/簡易譜面編輯器截圖2.jpg',
          '作品集素材/子午計畫主題音遊/同學試玩圖1.jpg',
          '作品集素材/子午計畫主題音遊/同學試玩圖2.jpg',
        ],
      },
      {
        heading: '譜面完成情況',
        text: '共選 15 首歌曲，期末前完成 8 首譜面製作。數字為難度標示，— 表示尚未完成。',
        html: renderMeridianChart(MERIDIAN_CHART_DATA),
      },
    ],
  },

  {
    id: 'white-script',
    title: '白色劇本',
    category: 'game',
    date: '2025.01',
    tags: ['恐怖解謎', 'RPG', '多結局', '3D', 'Unity'],
    thumbnail: '作品集素材/白色劇本/CG/Cg_必須守護的約定.jpg',
    primaryVideo: null,
    extraVideos: [],
    sections: [
      {
        text: '單人恐怖解謎 RPG，具備多重結局的分支敘事設計。負責程式系統設計、故事分支邏輯及 CG 演出流程實作。',
        images: [
          '作品集素材/白色劇本/CG/Cg_必須守護的約定.jpg',
          '作品集素材/白色劇本/CG/Cg_無盡的等待.jpg',
          '作品集素材/白色劇本/CG/Cg_遲來十年的約定.png',
        ],
      },
    ],
  },

  {
    id: 'antong',
    title: '安東464階',
    category: 'game',
    date: '2024.01',
    tags: ['VR', '恐怖解謎', '3D', 'Unity'],
    thumbnail: '作品集素材/安東464/圖/封面圖.png',
    primaryVideo: { type: 'yt', id: 'fs4nwtrSFro', label: '遊玩影片' },
    extraVideos: [
      { type: 'yt', id: 'hRBMBseP7Mk', label: '預告影片' },
    ],
    sections: [
      {
        heading: '遊戲概要',
        text: '以馬祖傳說故事為靈感改編的 VR 恐怖解謎遊戲，PC 平台，Unity 開發。「464 階」指安東坑道的實際樓梯階數，象徵玩家踏入地下靈異世界的入口。為學生課程期末作業之 Demo 作品，目標玩家設定為喜歡恐怖氛圍與地圖探索的玩家。',
        images: [
          '作品集素材/安東464/圖/封面圖.png',
          '作品集素材/安東464/圖/LOGO.PNG',
        ],
      },
      {
        heading: '遊戲玩法',
        text: '玩家持蠟燭在昏暗坑道中探索，完成以下目標：',
        html: '<ul class="modal-list"><li>依照任務提示尋找特定物品</li><li>利用線索設法逃離地下坑道</li><li>以蠟燭作為唯一光源進行探索</li><li>躲避不可視的怨靈</li><li>蠟燭熄滅即遊戲失敗，永困坑道</li></ul>',
        images: [
          '作品集素材/安東464/圖/手繪插圖.png',
          '作品集素材/安東464/圖/國軍頭盔.PNG',
        ],
      },
      {
        heading: '遊戲風格',
        text: '採寫實美術風格，呈現幽深昏暗的坑道氛圍，搭配真實洞穴音場設計強化沉浸感。美術參考 Five Nights At Freddy\'s 與 Phasmophobia。',
        images: [
          '作品集素材/安東464/圖/彼岸花.PNG',
          '作品集素材/安東464/圖/Game over 2.png',
        ],
      },
      {
        heading: '開發資訊',
        text: '5 人團隊歷時 10 週完成，使用 Unity 開發，於 2024/01/11 完成 Demo。個人負責 VR 互動機制設計與遊戲流程程式實作。',
      },
    ],
  },

  {
    id: 'yoyogo',
    title: 'yoyogo 幽幽出擊',
    category: 'game',
    date: '2024',
    tags: ['2D', '動作', 'Unity'],
    thumbnail: '作品集素材/yoyogo幽幽出擊/碎石路.png',
    primaryVideo: { type: 'yt', id: 'YiCxhYfmE_E', label: '遊玩影片' },
    extraVideos: [],
    sections: [
      {
        text: '2D 橫向動作遊戲，以 Unity 開發。負責遊戲機制設計與程式實作。',
        images: [
          '作品集素材/yoyogo幽幽出擊/碎石路.png',
        ],
      },
    ],
  },

  {
    id: 'circuit',
    title: '工作電子－電路爭奪戰',
    category: 'game',
    date: '2024',
    tags: ['RPG', '多人', 'Unity'],
    thumbnail: '作品集素材/工作電子-電路爭奪戰/遊戲截圖/截圖1.png',
    primaryVideo: { type: 'yt', id: 'TBuTLxnuIy8', label: '遊玩影片' },
    extraVideos: [],
    sections: [
      {
        text: '以電路板為舞台的多人 RPG，玩家在電路節點上展開策略對抗。負責核心戰鬥系統與程式設計。',
        images: [
          '作品集素材/工作電子-電路爭奪戰/遊戲截圖/截圖1.png',
          '作品集素材/工作電子-電路爭奪戰/遊戲截圖/截圖2.png',
          '作品集素材/工作電子-電路爭奪戰/遊戲截圖/截圖3.png',
          '作品集素材/工作電子-電路爭奪戰/遊戲截圖/截圖4.png',
          '作品集素材/工作電子-電路爭奪戰/遊戲截圖/截圖5.png',
        ],
      },
    ],
  },

  /* ── 互動展覽 ───────────────────────────────── */
  {
    id: 'daiguokuo',
    title: '臺北大闇鍋',
    category: 'exhibition',
    date: '2025.01',
    tags: ['VR', '雙人連線', '互動展覽', 'Unity'],
    thumbnail: '作品集素材/臺北大闇鍋/封面_橫式.png',
    primaryVideo: { type: 'yt', id: '3I9t-X_LXsI', label: '展覽影片' },
    extraVideos: [],
    sections: [
      {
        text: 'VR 雙人連線互動展覽，玩家各自扮演角色，在虛擬暗室中合作完成任務。負責網路連線系統架構與 VR 互動機制程式實作。',
        images: [
          '作品集素材/臺北大闇鍋/封面_直式.png',
          '作品集素材/臺北大闇鍋/20250109_142903.jpg',
          '作品集素材/臺北大闇鍋/20250109_143304.jpg',
        ],
      },
    ],
  },

  {
    id: 'paradise',
    title: 'PARADISE 神鳥尋寶趣',
    category: 'exhibition',
    date: '2024.06',
    tags: ['Vtuber', '線下互動', '互動展覽', 'Unity', 'Android'],
    thumbnail: null,
    thumbnailOverlay: '作品集素材/PARADISE神鳥尋寶趣/主視覺/小鳥海報1.jpg',
    primaryVideo: { type: 'drive', id: '1jGmGJh1tX32tammhwnhHiw0JgVn7jm9k', label: '展覽影片 1' },
    extraVideos: [
      { type: 'drive', id: '1yCqEHcM1M19jwqe9WRk3auj1dhEHB1nq', label: '展覽影片 2' },
      { type: 'drive', id: '1T5ElOTe-nsey-p1oXV82xgsLcnxe1-U2', label: '展覽影片 3' },
      { type: 'drive', id: '1daZqG_f84bP6ToFb4gEonNglHfpaHSeX', label: '展覽影片 4' },
      { type: 'drive', id: '120PSqVBfuiUIMunvivUbH7Yxe2Jw5y_D', label: '展覽影片 5' },
    ],
    sections: [
      {
        heading: '展覽概要',
        text: '以「粉絲可以和 Vtuber 現場互動」為核心概念製作的線下互動展覽。以自製虛擬形象「菈琦雅」為主角，在展場內打造集直播、尋寶、卡片互動於一體的沉浸式粉絲體驗。個人負責互動程式設計與展覽流程 UX 規劃。',
        images: [
          '作品集素材/PARADISE神鳥尋寶趣/主視覺/小鳥海報1.jpg',
          '作品集素材/PARADISE神鳥尋寶趣/PARADISE 標準字/字_完整加陰影.png',
        ],
      },
      {
        heading: '三大核心系統',
        text: '展覽由三支應用程式構成，分工負責不同的互動角色：',
        html: '<ul class="modal-list"><li><strong>APP 1 — Vtuber 專用可互動 3D 背景場景：</strong>供中之人（操控者）使用，背景場景可即時響應觀眾的互動操作</li><li><strong>APP 2 — 會場掛卡片的樹型互動裝置：</strong>展場實體裝置，接收觀眾遞送的虛擬卡片並顯示於場景中</li><li><strong>APP 3 — 粉絲用互動手機程式：</strong>觀眾透過自己的 Android 手機參與各種互動玩法</li></ul>',
        images: [
          '作品集素材/PARADISE神鳥尋寶趣/APP圖片/主畫面.png',
          '作品集素材/PARADISE神鳥尋寶趣/APP圖片/Vtuber專用可互動背景  (APP  1).png',
          '作品集素材/PARADISE神鳥尋寶趣/APP圖片/會場掛卡片用的樹  (APP  2).jpg',
        ],
      },
      {
        heading: '粉絲互動玩法',
        text: '觀眾透過手機 APP 可進行三種互動：寫一張卡片送給菈琦雅、把寫好的卡片遞送到展場的互動樹上、以及在展場內展開尋寶任務。',
        images: [
          '作品集素材/PARADISE神鳥尋寶趣/APP圖片/寫卡片.png',
          '作品集素材/PARADISE神鳥尋寶趣/APP圖片/遞送卡片.png',
          '作品集素材/PARADISE神鳥尋寶趣/APP圖片/尋寶.png',
        ],
      },
      {
        heading: '展覽角色：菈琦雅',
        text: '展覽以自製虛擬形象「菈琦雅」為主角。角色具備完整設定，包含三視圖、世界觀背景與漫畫故事，並實際作為直播展演中的 Vtuber 形象使用。',
        images: [
          '作品集素材/PARADISE神鳥尋寶趣/菈琦雅角色設定/三視圖.png',
          '作品集素材/PARADISE神鳥尋寶趣/菈琦雅角色設定/簡介.png',
          '作品集素材/PARADISE神鳥尋寶趣/菈琦雅角色設定/居住地.png',
          '作品集素材/PARADISE神鳥尋寶趣/菈琦雅角色設定/漫畫.png',
        ],
      },
      {
        heading: 'Vtuber 直播空間',
        text: '展場內搭建臨時直播區，以筆電與 Samsung S7 FE 作為核心設備，組員化身菈琦雅的中之人，透過 Twitch 向現場觀眾進行虛擬形象直播。直播場景可即時響應觀眾透過手機 APP 的操作，使實體展場與虛擬場景形成連動。',
        images: [
          '作品集素材/PARADISE神鳥尋寶趣/直播場地圖片/直播場地.jpg',
        ],
      },
      {
        heading: '展覽現場',
        text: '現場另設有塗鴉區供觀眾留言互動，並於展覽結束後拍攝小組合照。',
        images: [
          '作品集素材/PARADISE神鳥尋寶趣/展覽圖片/1718705157827.jpg',
          '作品集素材/PARADISE神鳥尋寶趣/展覽圖片/1718705123135.jpg',
          '作品集素材/PARADISE神鳥尋寶趣/展覽圖片/1718705135527.jpg',
          '作品集素材/PARADISE神鳥尋寶趣/展覽圖片/1718705156372.jpg',
          '作品集素材/PARADISE神鳥尋寶趣/展覽圖片/塗鴉區.jpg',
          '作品集素材/PARADISE神鳥尋寶趣/展覽圖片/小組合照.jpg',
          '作品集素材/PARADISE神鳥尋寶趣/展覽圖片/溫暖的後台.jpg',
        ],
      },
      {
        heading: '周邊製作',
        text: '配合展覽製作了菈琦雅的周邊商品，包含壓克力立牌與貼紙，於展覽現場展示。',
        images: [
          '作品集素材/PARADISE神鳥尋寶趣/周邊圖片/壓克力立牌.jpg',
          '作品集素材/PARADISE神鳥尋寶趣/周邊圖片/很多立牌.jpg',
          '作品集素材/PARADISE神鳥尋寶趣/周邊圖片/貼紙.jpg',
        ],
      },
      {
        heading: '開發資訊',
        text: '5 人團隊歷時 12 週完成，使用 Unity 開發，支援 Windows 與 Android 跨平台。直播平台使用 Twitch，設備為筆電、Samsung S7 FE 及 Android 手機。於 2024/06/18 完成展覽。',
      },
    ],
  },

  {
    id: 'matsu',
    title: '馬祖 VR 坑道體驗',
    category: 'exhibition',
    date: '2023.06',
    tags: ['VR', '地圖探索', '互動展覽', 'Unity'],
    thumbnail: '作品集素材/馬祖新村展覽/海報圖/第五組_VR馬祖坑道體驗.png',
    primaryVideo: { type: 'yt', id: 'XV9pIPgAxzs', label: '實機影片' },
    extraVideos: [
      { type: 'yt', id: 'EYUfCzB8-dI', label: '展覽預覽' },
    ],
    sections: [
      {
        text: '以馬祖軍事坑道為場景的 VR 互動展覽，帶領觀眾沉浸式探索歷史空間。負責 VR 場景互動機制與地圖導覽系統開發。',
        images: [
          '作品集素材/馬祖新村展覽/logo/LOGO.png',
          '作品集素材/馬祖新村展覽/校外展覽/20231029_104618.jpg',
          '作品集素材/馬祖新村展覽/校外展覽/20231029_125445.jpg',
          '作品集素材/馬祖新村展覽/校外展覽/20231029_144236.jpg',
          '作品集素材/馬祖新村展覽/校內展覽/20230609_155344.jpg',
        ],
      },
    ],
  },

  {
    id: 'foodman',
    title: 'Food Man 互動遊戲',
    category: 'exhibition',
    date: '2023.01',
    tags: ['互動裝置', '展覽', 'Unity'],
    thumbnail: '作品集素材/FoodMan互動遊戲/主選單按鈕參考-01.png',
    primaryVideo: { type: 'drive', id: '1TNeyoTMGZYrXA_jjXmPWxetuDk_lYl8D', label: '展覽影片' },
    extraVideos: [],
    sections: [
      {
        text: '以食物擬人化為主題的互動展覽遊戲。負責遊戲程式設計與玩家互動體驗規劃。',
        images: [
          '作品集素材/FoodMan互動遊戲/20230113_095011.jpg',
          '作品集素材/FoodMan互動遊戲/20230113_094824.jpg',
          '作品集素材/FoodMan互動遊戲/IMG_9739.JPG',
        ],
      },
    ],
  },

  /* ── 音樂媒體 ───────────────────────────────── */
  {
    id: 'oto-no-chiru',
    title: '音の散る道',
    category: 'music',
    date: '2024.06',
    tags: ['原創曲', 'MV', '作詞作曲', '編曲'],
    thumbnail: null,
    primaryVideo: { type: 'yt', id: 'msQMiwR8H18', label: 'MV' },
    extraVideos: [
      { type: 'yt', id: 'yDgALsroI-s', label: '歌詞影片（夏語遙版本）' },
    ],
    sections: [
      {
        text: '個人原創歌曲，含完整 MV 製作。詞曲創作、配唱、編曲及影像製作皆由本人獨立完成。',
      },
    ],
  },

  {
    id: 'doll',
    title: '洋娃娃',
    category: 'music',
    date: '2024',
    tags: ['原創曲', '作詞作曲', '配唱'],
    thumbnail: '作品集素材/doll洋娃娃/ROD2.jpg',
    primaryVideo: { type: 'yt', id: 'XkKk5HtQXGw', label: '歌詞影片（夏語遙版本）' },
    extraVideos: [],
    sections: [
      {
        text: '個人原創歌曲，詞曲創作、編曲與配唱皆由本人完成。',
        images: [
          '作品集素材/doll洋娃娃/ROD2.jpg',
        ],
      },
    ],
  },

  {
    id: 'aozora',
    title: '青空',
    category: 'music',
    date: '2024',
    tags: ['原創曲', '作詞作曲', '配唱'],
    thumbnail: null,
    primaryVideo: { type: 'yt', id: 'glmmaVolqMw', label: '影片' },
    extraVideos: [],
    sections: [
      {
        text: '個人原創歌曲，詞曲創作、編曲與配唱皆由本人完成。',
      },
    ],
  },

  {
    id: 'yuki',
    title: '雪のような灰',
    category: 'music',
    date: '2024',
    tags: ['原創曲', 'feat. 初音ミク', '作詞作曲', '編曲'],
    thumbnail: '作品集素材/雪のような灰/yukinoyounahai標題.png',
    primaryVideo: { type: 'yt', id: 'jB-0KbPeJeU', label: '歌詞影片' },
    extraVideos: [],
    sections: [
      {
        text: '個人原創曲，feat. 初音ミク。詞曲創作、編曲及混音皆由本人完成。',
        images: [
          '作品集素材/雪のような灰/雪のような灰1.png',
          '作品集素材/雪のような灰/雪のような灰2.png',
          '作品集素材/雪のような灰/image2.png',
        ],
      },
    ],
  },

  {
    id: 'lady',
    title: 'Lady / 米津玄師 Cover',
    category: 'music',
    date: '2024',
    tags: ['翻唱', '米津玄師'],
    thumbnail: '作品集素材/Lady米津玄師 Cover/影片封面.jpg',
    primaryVideo: { type: 'yt', id: 'ARyrl9PLPWA', label: '翻唱影片' },
    extraVideos: [],
    sections: [
      {
        text: '米津玄師「Lady」翻唱。',
        images: [
          '作品集素材/Lady米津玄師 Cover/影片封面.jpg',
        ],
      },
    ],
  },

];

/* =====================
   Helpers
   ===================== */
const CATEGORY_LABEL = { game: '遊戲製作', exhibition: '互動展覽', music: '音樂媒體' };

function embedUrl(v) {
  if (v.type === 'yt')    return `https://www.youtube.com/embed/${v.id}?rel=0`;
  if (v.type === 'drive') return `https://drive.google.com/file/d/${v.id}/preview`;
  return '';
}

function encodePath(p) {
  return p.split('/').map(s => encodeURIComponent(s)).join('/');
}

function sectionHtml(s) {
  const imgs = s.images && s.images.length
    ? `<div class="section-gallery">${s.images.map(p => `<img src="${encodePath(p)}" alt="" loading="lazy">`).join('')}</div>`
    : '';
  return `
    <div class="modal-section">
      ${s.heading ? `<h3 class="modal-section-heading">${s.heading}</h3>` : ''}
      ${s.text ? `<p class="modal-section-text">${s.text}</p>` : ''}
      ${s.html || ''}
      ${imgs}
    </div>`;
}

function badgeHtml(category) {
  return `<span class="badge badge-${category}">${CATEGORY_LABEL[category]}</span>`;
}

function tagsHtml(tags) {
  return tags.map(t => `<span class="tag">${t}</span>`).join('');
}

function videoBlock(v) {
  const externalLink = v.type === 'yt'
    ? `<a class="video-external-link" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">↗ 在 YouTube 觀看</a>`
    : '';
  return `
    <div class="modal-video">
      <p class="video-label">${v.label}</p>
      <div class="video-wrap">
        <iframe src="${embedUrl(v)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
      ${externalLink}
    </div>`;
}

const CHEVRON_LEFT  = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
const CHEVRON_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

function videoPlaylistHtml(videos) {
  const first = videos[0];
  const initialLink = first.type === 'yt'
    ? `<a class="video-external-link" href="https://www.youtube.com/watch?v=${first.id}" target="_blank" rel="noopener">↗ 在 YouTube 觀看</a>`
    : '';
  return `
    <div class="video-player">
      <div class="video-wrap">
        <iframe src="${embedUrl(first)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
      <div class="video-controls">
        <button class="video-nav-btn video-prev" aria-label="上一個" disabled>${CHEVRON_LEFT}</button>
        <span class="video-ctrl-label">${first.label}</span>
        <span class="video-ctrl-sep">·</span>
        <span class="video-ctrl-index">1 / ${videos.length}</span>
        <button class="video-nav-btn video-next" aria-label="下一個">${CHEVRON_RIGHT}</button>
      </div>
      <div class="video-external-wrap">${initialLink}</div>
    </div>`;
}

function initVideoPlayer(videos) {
  let idx = 0;
  const player = document.querySelector('#modal-body .video-player');
  if (!player) return;
  const iframe    = player.querySelector('iframe');
  const labelEl   = player.querySelector('.video-ctrl-label');
  const indexEl   = player.querySelector('.video-ctrl-index');
  const prevBtn   = player.querySelector('.video-prev');
  const nextBtn   = player.querySelector('.video-next');
  const linkWrap  = player.querySelector('.video-external-wrap');

  function go(newIdx) {
    idx = newIdx;
    const v = videos[idx];
    iframe.src = embedUrl(v);
    labelEl.textContent = v.label;
    indexEl.textContent = `${idx + 1} / ${videos.length}`;
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === videos.length - 1;
    linkWrap.innerHTML = v.type === 'yt'
      ? `<a class="video-external-link" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">↗ 在 YouTube 觀看</a>`
      : '';
  }

  prevBtn.addEventListener('click', () => { if (idx > 0) go(idx - 1); });
  nextBtn.addEventListener('click', () => { if (idx < videos.length - 1) go(idx + 1); });
}

/* =====================
   Render Cards
   ===================== */
function renderCards(filter) {
  const grid = document.getElementById('card-grid');
  const list = filter === 'all' ? WORKS : WORKS.filter(w => w.category === filter);

  grid.innerHTML = list.map(w => {
    const thumb = w.thumbnail
      ? `<img src="${encodePath(w.thumbnail)}" alt="${w.title}" loading="lazy">`
      : w.thumbnailOverlay
        ? `<div class="thumb-placeholder ${w.category}"><img class="thumb-overlay" src="${encodePath(w.thumbnailOverlay)}" alt="${w.title}" loading="lazy"></div>`
        : `<div class="thumb-placeholder ${w.category}">${w.title}</div>`;

    return `
      <article class="card" data-id="${w.id}" role="button" tabindex="0" aria-label="${w.title}">
        <div class="card-thumb">${thumb}</div>
        <div class="card-body">
          <div class="card-meta">
            ${badgeHtml(w.category)}
            <span class="card-date">${w.date}</span>
          </div>
          <h3 class="card-title">${w.title}</h3>
          <div class="card-tags">${tagsHtml(w.tags.slice(0, 4))}</div>
        </div>
      </article>`;
  }).join('');

  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.id); }
    });
  });
}

/* =====================
   Modal
   ===================== */
function openModal(id) {
  const w = WORKS.find(x => x.id === id);
  if (!w) return;

  const allVideos = [w.primaryVideo, ...w.extraVideos].filter(Boolean);
  const videoHtml = allVideos.length > 1
    ? videoPlaylistHtml(allVideos)
    : allVideos.length === 1 ? videoBlock(allVideos[0]) : '';
  const sectionsHtml = w.sections.map(sectionHtml).join('');

  document.getElementById('modal-body').innerHTML = `
    <div class="modal-meta">
      ${badgeHtml(w.category)}
      <span class="card-date">${w.date}</span>
    </div>
    <h2 class="modal-title">${w.title}</h2>
    <div class="modal-tags">${tagsHtml(w.tags)}</div>
    ${videoHtml}
    ${sectionsHtml}
  `;

  if (allVideos.length > 1) initVideoPlayer(allVideos);

  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => { document.getElementById('modal-body').innerHTML = ''; }, 220);
}

/* =====================
   Init
   ===================== */
document.addEventListener('DOMContentLoaded', () => {
  renderCards('all');

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCards(tab.dataset.filter);
    });
  });

  document.getElementById('modal-close').addEventListener('click', closeModal);

  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
