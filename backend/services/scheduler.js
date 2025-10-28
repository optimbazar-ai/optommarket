const cron = require('node-cron');
const { generateDailyBlog } = require('./blogGenerator');
const { runPromotionScheduler, deactivateExpiredPromotions } = require('./promotionScheduler');

// Initialize all scheduled tasks
const initializeSchedulers = () => {
  console.log('\n📅 Initializing schedulers...');
  
  // Daily blog generator - Every day at 09:00 (Tashkent time UTC+5)
  // Cron: minute hour day month weekday
  cron.schedule('0 4 * * *', async () => {
    // 04:00 UTC = 09:00 UTC+5
    console.log('\n⏰ Running daily blog generator...');
    await generateDailyBlog();
  }, {
    scheduled: true,
    timezone: "UTC"
  });
  console.log('⏰ Kunlik blog generator ishga tushdi (har kuni 09:00 da)');
  
  // Product promotion scheduler - 3 times a day (10:00, 14:00, 18:00 Tashkent time)
  // 10:00 Tashkent = 05:00 UTC
  cron.schedule('0 5 * * *', async () => {
    console.log('\n⏰ Running promotion scheduler (10:00)...');
    await runPromotionScheduler();
  }, {
    scheduled: true,
    timezone: "UTC"
  });
  
  // 14:00 Tashkent = 09:00 UTC
  cron.schedule('0 9 * * *', async () => {
    console.log('\n⏰ Running promotion scheduler (14:00)...');
    await runPromotionScheduler();
  }, {
    scheduled: true,
    timezone: "UTC"
  });
  
  // 18:00 Tashkent = 13:00 UTC
  cron.schedule('0 13 * * *', async () => {
    console.log('\n⏰ Running promotion scheduler (18:00)...');
    await runPromotionScheduler();
  }, {
    scheduled: true,
    timezone: "UTC"
  });
  console.log('⏰ Kunlik mahsulot promotion ishga tushdi (10:00, 14:00, 18:00)');
  
  // Deactivate expired promotions - Every hour
  cron.schedule('0 * * * *', async () => {
    await deactivateExpiredPromotions();
  }, {
    scheduled: true,
    timezone: "UTC"
  });
  console.log('⏰ Eski promotion lar tozalash ishga tushdi (har soatda)');
  
  console.log('✅ All schedulers initialized\n');
};

// Manual trigger functions (for testing)
const triggerBlogGeneration = async () => {
  console.log('🔧 Manual trigger: Blog generation');
  return await generateDailyBlog();
};

const triggerPromotionGeneration = async () => {
  console.log('🔧 Manual trigger: Promotion generation');
  return await runPromotionScheduler();
};

module.exports = {
  initializeSchedulers,
  triggerBlogGeneration,
  triggerPromotionGeneration
};
