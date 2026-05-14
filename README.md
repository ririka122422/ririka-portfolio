# 作品集網站

Ririka 的個人作品集網站。純靜態網頁，無 build step，瀏覽器直接開 `index.html` 即可。

---

## 檔案結構

```
作品集網站/
├── index.html          # 頁面骨架（hero、tabs、modal 容器）
├── script.js           # 作品資料 + 渲染邏輯（單一入口）
├── style.css           # 全部樣式
├── README.md           # ← 本檔案
├── 關於我/
│   └── avatar.png      # 首頁頭像（檔名固定為 avatar.png）
└── 作品集素材/
    └── [各作品資料夾]/  # 每件作品的圖片素材
```

---

## 維護入口速查

| 想做什麼 | 改哪裡 |
|---|---|
| 新增 / 修改作品內容 | [script.js](script.js) 的 `WORKS` 陣列 |
| 修改子午計畫譜面表 | [script.js](script.js) 的 `MERIDIAN_CHART_DATA` |
| 修改首頁姓名、簡介、社群連結 | [index.html](index.html) `<section class="hero">` |
| 修改頁尾 | [index.html](index.html) `<footer>` |
| 換頭像 | 把新圖放到 `關於我/avatar.png` |
| 改色系 / 版面 | [style.css](style.css) 最上方的 `:root` 變數 |
| 新增分類（如「動畫作品」） | 同時改 `index.html` 的 tabs、`script.js` 的 `CATEGORY_LABEL`、`style.css` 的 `.badge-xxx` |

---

## 如何新增一件作品

1. **把圖片放到 `作品集素材/[作品名稱]/` 底下**（資料夾名可中可英）。
2. **打開 [script.js](script.js)，在 `WORKS` 陣列中新增一個物件**，依分類插入對應段落（遊戲製作 / 互動展覽 / 音樂媒體）。
3. **參考下方 schema 說明** 填好欄位即可。

最小範例（簡單版，只有一段介紹）：

```js
{
  id: 'my-new-work',                // 唯一英文 ID
  title: '我的新作品',
  category: 'game',                 // 'game' | 'exhibition' | 'music'
  date: '2025.05',
  tags: ['Unity', '3D'],
  thumbnail: '作品集素材/我的新作品/封面.jpg',
  primaryVideo: { type: 'yt', id: 'YOUTUBE_ID', label: '遊玩影片' },
  extraVideos: [],
  sections: [
    {
      text: '作品介紹文字……',
      images: [
        '作品集素材/我的新作品/截圖1.jpg',
        '作品集素材/我的新作品/截圖2.jpg',
      ],
    },
  ],
},
```

完整版（多段，比照 `meridian` / `antong`）：

```js
{
  id: 'my-new-work',
  title: '我的新作品',
  category: 'game',
  date: '2025.05',
  tags: ['Unity', '3D'],
  thumbnail: '作品集素材/我的新作品/封面.jpg',
  primaryVideo: { type: 'yt', id: 'YOUTUBE_ID', label: 'Demo 影片' },
  extraVideos: [
    { type: 'yt', id: 'ANOTHER_ID', label: '預告影片' },
  ],
  sections: [
    { heading: '遊戲概要', text: '...', images: [ /* 圖片路徑 */ ] },
    { heading: '遊戲玩法', text: '...', images: [...] },
    { heading: '開發資訊', text: '...' },
  ],
},
```

---

## Work Schema（作品資料結構）

每件作品物件的欄位定義：

| 欄位 | 必填 | 型別 | 說明 |
|---|---|---|---|
| `id` | ✅ | string | 唯一識別碼，建議 kebab-case 英文（不顯示給使用者） |
| `title` | ✅ | string | 作品顯示名稱 |
| `category` | ✅ | `'game'` \| `'exhibition'` \| `'music'` | 分類，影響徽章顏色與篩選 tab |
| `date` | ✅ | string | 日期字串，例如 `'2025.01'`、`'2024.06'`、`'2024'` |
| `tags` | ✅ | string[] | 標籤陣列，卡片只顯示前 4 個 |
| `thumbnail` | ⚪ | string \| null | 卡片縮圖路徑；`null` 時顯示彩色文字佔位卡 |
| `primaryVideo` | ⚪ | `Video` \| null | 主要影片（顯示在 modal 最上方） |
| `extraVideos` | ✅ | `Video[]` | 其他影片（沒有就填 `[]`） |
| `sections` | ✅ | `Section[]` | 作品內容區塊；至少要有一個 |

### Video 型別

```js
{ type: 'yt' | 'drive', id: string, label: string }
```

- `type: 'yt'` → YouTube，`id` 是影片 ID（網址 `?v=` 後面那段）
- `type: 'drive'` → Google Drive，`id` 是檔案 ID（網址 `/d/...../` 中間那段）
- `label` → 顯示在影片上方的標題，如 `'Demo 影片'`、`'展覽影片 1'`

### Section 型別

每個 section 是 modal 內的一個區塊，可有可無 heading／文字／自訂 HTML／圖庫：

```js
{
  heading?: string,     // 區塊小標題（可省略）
  text?: string,        // 段落文字
  html?: string,        // 自訂 HTML（如清單、表格）
  images?: string[],    // 圖片路徑陣列
}
```

四個欄位都是選填，但一個 section 至少要有一項才有意義。渲染順序固定為：heading → text → html → images。

**`html` 欄位的常見用途：**

- 條列清單：
  ```js
  html: '<ul class="modal-list"><li>項目一</li><li>項目二</li></ul>'
  ```
- 自訂表格（譜面表為現成範例，見 `MERIDIAN_CHART_DATA`）

---

## 子午計畫譜面表

譜面資料定義在 [script.js](script.js) 最上方的 `MERIDIAN_CHART_DATA`。

每個角色一個 group：

```js
{
  char: '浠 Mizuki',
  songs: [
    { name: '未知未踏アルスハイル' },                              // 三難度都未做
    { name: '桜華残響', easy: 5, normal: 8, hard: 10 },          // 三難度都做完
    { name: 'Siɹən', hard: 11 },                                 // 只做 hard
  ],
}
```

數字會自動套上對應顏色（藍 / 橘 / 紅），未填的欄位顯示 `—`。

---

## 設計原則（給未來修改時的參考）

1. **資料與邏輯分離。** 所有作品內容都在 `WORKS` 陣列裡，`openModal` 等渲染函式不該硬編內容。
2. **單一渲染路徑。** 所有作品統一用 `sections` schema，避免特殊作品另開分支。
3. **圖片絕不寫死在 HTML / CSS。** 都從資料推進去 render function。
4. **新增分類要三處同步：** `index.html` 的 tab、`script.js` 的 `CATEGORY_LABEL`、`style.css` 的 `.badge-xxx` 與 `.thumb-placeholder.xxx`。

---

## 後續預定的重構（尚未執行）

按優先序：

1. ES Module 化：`script.js` 拆成 `js/main.js` + `js/render.js` + `js/data/works/[id].js`，每件作品一個檔。
2. 每件作品加 `assetsBase`，省去重複前綴路徑。
3. 素材資料夾改英文 kebab-case（與 `id` 對齊），副檔名統一小寫——為日後部署到 Linux 主機（GitHub Pages 等）做準備。
4. Git 化 + 部署。
