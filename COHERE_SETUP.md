# 🤖 Cohere AI Setup (Gemini Backup)

## Nega Cohere?

Gemini API **50 request/kun** limit bor. Cohere **backup** sifatida ishlatiladi:
- ✅ **1000 request/kun** - bepul
- ✅ **Global** - O'zbekistondan ishlaydi
- ✅ **Tez** - Gemini kabi sifatli
- ✅ **Avtomatik fallback** - Gemini ishlamasa, Cohere ishlaydi

---

## 1. Cohere API Key olish

### Ro'yxatdan o'tish:
1. **https://dashboard.cohere.com/welcome/register** ga o'ting
2. Email va parol kiriting (yoki Google bilan)
3. **100% BEPUL** - hech qanday to'lov yo'q!
4. O'zbekistondan ishlaydi! ✅

### API Key olish:
1. Login qiling: https://dashboard.cohere.com/
2. Chap menyuda **"API Keys"** ga o'ting
3. **Default Trial Key** ko'rinadi:

```
Trial Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Yoki **"Create New Key"** tugmasini bosing.

---

## 2. Backend .env fayliga qo'shish

`backend/.env` faylini oching va qo'shing:

```env
# Cohere AI (backup for Gemini)
COHERE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**O'z API key'ingizni qo'ying!**

---

## 3. Production (Render) uchun

### Render Dashboard'da:

1. **https://dashboard.render.com/** ga o'ting
2. Backend service'ni tanlang
3. **Environment** tabga o'ting
4. **Add Environment Variable** tugmasini bosing

Qo'shing:

```
COHERE_API_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

5. **Save Changes** tugmasini bosing
6. Service avtomatik restart bo'ladi

---

## 4. Qanday ishlaydi?

### Fallback mexanizmi:

```javascript
1. User "AI bilan yozdirish" tugmasini bosadi
2. Backend Gemini'ni sinaydi
   ├─ ✅ SUCCESS → Gemini tavsif qaytaradi
   └─ ❌ FAILED (429, quota exceeded)
       └─ Backend Cohere'ni sinaydi
           ├─ ✅ SUCCESS → Cohere tavsif qaytaradi
           └─ ❌ FAILED → Xato ko'rsatadi
```

### Console log:
```
🤖 Trying Gemini AI...
⚠️ Gemini failed, trying Cohere...
✅ Cohere AI success
```

---

## 5. Limitlar

### Gemini (Primary):
- **50 request/kun** (Free Tier)
- **Fast** - 2-3 soniya

### Cohere (Backup):
- **1000 request/kun** (Trial)
- **Fast** - 2-4 soniya
- **Production:** 10,000 request/kun (bepul plan)

### Jami (ikkalasi bilan):
- **1050 request/kun** - kifoya! 🎉

---

## 6. Test qilish

### Local'da:

1. Backend serverni restart qiling:
   ```bash
   cd backend
   npm run dev
   ```

2. Frontend'da mahsulot qo'shing

3. "AI bilan yozdirish" tugmasini bosing

4. Backend console'da log ko'ring:
   ```
   🤖 Trying Gemini AI...
   ✅ Gemini AI success
   ```

   Yoki Gemini limit tugasa:
   ```
   🤖 Trying Gemini AI...
   ⚠️ Gemini failed, trying Cohere...
   ✅ Cohere AI success
   ```

---

## 7. Qaysi AI ishlatilganini ko'rish

Frontend response'da:

```javascript
{
  success: true,
  data: {
    description: "...",
    provider: "Gemini" // yoki "Cohere"
  }
}
```

---

## ✅ Afzalliklar

### Dual AI System:
- 🔄 **Auto Fallback** - Gemini ishlamasa, Cohere avtomatik
- 📈 **1050 request/kun** - Gemini + Cohere
- ⚡ **Fast** - Har ikkisi ham tez
- 🌍 **Global** - O'zbekistondan ishlaydi
- 💰 **100% BEPUL** - Ikkalasi ham bepul
- 🛡️ **Reliable** - Ikkita backup

### Single AI'dan farqi:
| Feature | Single AI | Dual AI |
|---------|-----------|---------|
| Limit | 50/kun | 1050/kun |
| Downtime | Ishlamasa to'xtaydi | Backup ishlaydi |
| Speed | 2-3s | 2-4s |
| Reliability | Low | High ✅ |

---

## 🚨 Troubleshooting

### 1. "Cohere API key topilmadi"
**Yechim:** `.env` fayilda `COHERE_API_KEY` borligini tekshiring

### 2. "Both AI services failed"
**Yechim:**
- Gemini API key to'g'riligini tekshiring
- Cohere API key to'g'riligini tekshiring
- Internet ulanishini tekshiring

### 3. "Rate limit exceeded"
**Yechim:** 
- Gemini: 24 soat kuting (50/kun limit)
- Cohere: 1000/kun limit, kuting

---

## 🎯 Best Practices

### Production'da:

1. **Har ikkala API key'ni** Render'ga qo'shing
2. **Monitor qiling** - qaysi AI ko'proq ishlatilayotganini
3. **Limitlarni kuzating** - dashboard'larda

### Development'da:

1. Test qilishda **Cohere'ni** ko'proq ishlating
2. Gemini'ni production uchun saqlang
3. Console log'larni kuzating

---

## 📞 Links

- **Cohere Dashboard:** https://dashboard.cohere.com/
- **API Docs:** https://docs.cohere.com/
- **Free Plan:** 1000 requests/day
- **Support:** support@cohere.com

---

## 🎉 Tayyor!

Cohere API key'ni `.env` ga qo'shgach:
1. ✅ Gemini limit tugasa Cohere ishlaydi
2. ✅ 1050 request/kun (ikkalasi bilan)
3. ✅ 100% bepul
4. ✅ O'zbekistondan ishlaydi!

**Next:** Backend serverni restart qiling va AI'ni test qiling! 🚀
