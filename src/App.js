import React from 'react';
import EnhancedStartupFunnel from './components/charts/EnhancedStartupFunnel';
import EnhancedMarketShareFramework from './components/charts/EnhancedMarketShareFramework';
import EnhancedSuccessFactorComparison from './components/charts/EnhancedSuccessFactorComparison';
import UserAcquisitionStrategies from './components/charts/UserAcquisitionStrategies';
import StartupFailureCauses from './components/charts/StartupFailureCauses';
import ScalingPhaseChallenges from './components/charts/ScalingPhaseChallenges';
import GrowthTimelineComparison from './components/charts/GrowthTimelineComparison';
import EcommerceMarketShareEvolution from './components/charts/EcommerceMarketShareEvolution';
import SuccessFactorMatrix from './components/charts/SuccessFactorMatrix';
import StatisticalProbabilityChart from './components/charts/StatisticalProbabilityChart';
import './App.css';

function App() {
  return (
    <div className="article-container">
      <header>
        <h1>The Long Shot: Why Capturing 1% Market Share Is Tech's Greatest Challenge</h1>
        <p className="author">Drew Taylor</p>
        <p className="institution">University of Texas at Austin</p>
        <p className="email">drewtaylor@utexas.edu</p>
      </header>
      
      <section className="abstract">
        <h2>Abstract</h2>
        <p>
          This white paper examines the critical journey tech startups face when attempting to capture their first 
          1% of market share, compared with the subsequent challenge of scaling to 20%. Through extensive case study 
          analysis across software, social media, e-commerce, and cloud computing sectors, we identify that while 
          approximately 90% of startups fail to reach 1% market share, 80% of these fail to reach mainstream adoption. 
          The research reveals distinct success factors at each stage: initial traction demands innovation and 
          product-market fit, while scaling requires operational excellence and competitive strategy. This analysis provides 
          a framework for understanding the statistical realities, success patterns, and strategic implications for 
          technology market entrants.
        </p>
      </section>
      
      <section className="introduction">
        <h2>1 Introduction</h2>
        <p>
          Breaking into competitive technology markets presents a formidable challenge for startups. This white paper 
          examines the journey tech companies face as they attempt to grow from zero market presence to meaningful market 
          share, with particular focus on the critical threshold of 1% market share. We analyze both the initial traction 
          phase (0% to 1%) and the subsequent scaling phase (1% to 20%), providing a comparative framework to understand 
          the unique challenges, success factors, and failure modes at each stage. Through extensive case studies across 
          various tech sectors—including software, social media, e-commerce, and cloud computing—we identify patterns that 
          differentiate market entrants who succeed from those who fail. The research reveals that while capturing initial 
          traction requires innovation and product-market fit, scaling beyond early adopters demands different competencies 
          focused on operational excellence and competitive strategy.
        </p>
      </section>
      
      <section className="background">
        <h2>2 Background: The Tech Startup Landscape</h2>
        <h3>The Statistical Reality of Startup Success</h3>
        
        {/* FIGURE 1 */}
        <div className="figure-container">
          <div className="chart-wrapper" id="funnel">
            <EnhancedStartupFunnel />
          </div>
          <p className="figure-caption">Figure 1: Startup Success Funnel - Visual showing narrowing success rates from founding through various market share thresholds</p>
        </div>
        
        <p>
          Most tech startups never reach even 1% market share. Approximately 90% of startups fail overall (Embroker, 2024), 
          with technology sectors showing a failure rate around 63% (with merely 10% surviving long-term) (GrowthList, 2023). 
          In consumer-facing markets like social media and e-commerce, the odds of capturing 1% of a large market are particularly 
          daunting, as investor Dharmesh Shah notes, "the probability of you capturing 1% of a mega-market is near zero" (Shah, 2022), 
          with about 80% of e-commerce startups failing (GrowthList, 2023).
        </p>
        
        <h3>Market Dynamics and Entry Barriers</h3>
        <p>
          Despite relatively low switching costs in many digital markets—allowing users to try new products with minimal commitment—several 
          significant barriers impede startups from gaining initial traction:
        </p>
        <ul>
          <li><strong>Network Effects:</strong> In social media and communication apps, the value increases with more users, creating a disadvantage for newcomers starting with empty networks.</li>
          <li><strong>Discoverability:</strong> In crowded app stores and marketplaces, visibility is a major challenge without substantial marketing resources.</li>
          <li><strong>Trust and Brand:</strong> Users hesitate to trust unknown startups with personal data or financial information.</li>
          <li><strong>Incumbent Response:</strong> Established players can quickly copy innovative features or leverage their scale to block newcomers.</li>
          <li><strong>Resource Constraints:</strong> Limited capital and personnel restrict a startup's ability to develop and market competitive products.</li>
        </ul>
        <p>
          These barriers create a "cold start" problem that most startups cannot overcome. However, those that do typically leverage 
          innovative products, timely market entry, and creative growth strategies to break through the noise.
        </p>
      </section>
      
      <section className="problem-statement">
        <h2>3 Problem Statement: The Market Share Acquisition Challenge</h2>
        <h3>The Theoretical Framework</h3>
        
        {/* FIGURE 2 */}
        <div className="figure-container">
          <div className="chart-wrapper" id="framework">
            <EnhancedMarketShareFramework />
          </div>
          <p className="figure-caption">Figure 2: Market Share Growth Framework - A visual model showing the five dimensions that influence market share growth</p>
        </div>
        
        <p>
          The growth of tech companies from zero to significant market share can be understood through a multi-dimensional framework encompassing:
        </p>
        <ul>
          <li><strong>Market conditions:</strong> Industry maturity, competitive landscape, and timing</li>
          <li><strong>Product factors:</strong> Innovation level, user experience, and differentiation</li>
          <li><strong>Growth mechanics:</strong> Network effects, viral loops, and distribution channels</li>
          <li><strong>Organizational capabilities:</strong> Team composition, capital efficiency, and execution</li>
          <li><strong>Competitive response:</strong> Incumbent reactions and competitive dynamics</li>
        </ul>
        <p>
          This framework helps explain why some startups breakthrough while most fail, and why the journey from 0% to 1% presents 
          different challenges than scaling from 1% to 20%.
        </p>
        
        <h3>The Two-Phase Challenge</h3>
        <p>
          The market share acquisition challenge can be understood as two distinct phases with different probability profiles:
        </p>
        <ul>
          <li><strong>Phase 1 (0% to 1%):</strong> The initial traction phase, where startups must create a viable product and find market fit. 
            This phase has the highest failure rate, with approximately 90% of ventures failing to achieve meaningful market presence.</li>
          <li><strong>Phase 2 (1% to 20%):</strong> The scaling phase, where companies with proven products must expand beyond early adopters. 
            According to Deloitte analysis, "More than 80% of start-ups fail because they are unable to adapt an emergent (niche) product to 
            the mainstream market" (Deloitte, 2023). In other words, only about 1 in 5 of those who capture an initial niche will successfully 
            "cross the chasm" to wider adoption.</li>
        </ul>
      </section>
      
      <section className="analysis">
        <h2>4 Analysis: Comparative Journey from 0% to 1% vs. 1% to 20%</h2>
        <h3>The Uphill Battle for Initial Traction (0% → 1%)</h3>
        
        {/* FIGURE 3 */}
        <div className="figure-container">
          <div className="chart-wrapper" id="factors">
            <EnhancedSuccessFactorComparison />
          </div>
          <p className="figure-caption">Figure 3: Success Factor Comparison - A side-by-side visual comparing critical success factors at each growth stage</p>
        </div>
        
        <h3>Case Studies: Successful Initial Traction</h3>
        <p>
          Several companies have successfully navigated the journey from zero to meaningful initial market share:
        </p>
        <ul>
          <li>
            <strong>Instagram (Social Media/Mobile App):</strong> Launched in 2010, Instagram reached 25,000 users on day one and 1 million users 
            within 10 weeks (Investopedia, 2022). This extraordinary growth stemmed from focusing on mobile photography at the perfect time 
            (coinciding with iPhone 4's improved camera), creating a simple yet compelling user experience that drove viral adoption.
          </li>
          <li>
            <strong>Slack (SaaS Communication):</strong> Originally an internal tool, Slack's public beta in 2013 attracted 8,000 sign-ups on its 
            first day and grew to 285,000 daily users by the end of its first year (KickStartSideHustle, 2023). Its success came from delivering 
            a highly polished product that spread through word-of-mouth in workplaces, with users actively promoting the service without significant 
            marketing investment—Slack famously amassed a "Twitter wall of love" of people praising the product (FirstRound Review, 2022).
          </li>
          <li>
            <strong>TikTok (Social Mobile App):</strong> Emerging as one of the fastest-growing social platforms ever, TikTok reached 1 billion users 
            more quickly than Facebook or Instagram (Connell, 2024). Its algorithmic short-video format attracted young users en masse, proving that 
            even in saturated social media markets, a differentiated offering could achieve extraordinary growth.
          </li>
          <li>
            <strong>Airbnb (Marketplace):</strong> Facing the classic chicken-and-egg problem of marketplaces in 2008-2010, Airbnb employed creative 
            growth tactics—including integration with Craigslist to tap into its established user base (GrowthHackers, 2022) and directly recruiting 
            Craigslist hosts. The team built tools for Airbnb hosts to cross-post listings to Craigslist, effectively "hacking" into a much larger 
            platform's audience (Hackernoon, 2022). These approaches helped Airbnb transition from a niche service to a global network.
          </li>
          <li>
            <strong>Chewy (E-commerce):</strong> Entering the online pet supplies market in 2011 against established players, Chewy differentiated 
            through exceptional customer service and a deep focus on pet owners' needs. This approach drove growth from $2 million in sales in 2011 
            to over $3.5 billion by 2018 (PetFoodIndustry, 2022), demonstrating how niche focus can enable a startup to capture significant market 
            share against giants like Amazon. Chewy's approach paid off, with surveys showing about half of U.S. online pet shoppers using Chewy as 
            a go-to source (Statista, 2023).
          </li>
        </ul>

        <h3>Effective User Acquisition Strategies: 0% → 1%</h3>
        
        {/* FIGURE 4 */}
        <div className="figure-container">
          <div className="chart-wrapper">
            <UserAcquisitionStrategies />
          </div>
          <p className="figure-caption">Figure 4: User Acquisition Strategies - Visual showing effectiveness of different acquisition strategies at the initial traction phase</p>
        </div>
        
        <p>Early-stage startups that successfully broke through often employed creative, capital-efficient growth approaches:</p>
        
        <ul>
          <li><strong>Viral Referral Programs:</strong> Dropbox's referral program grew its user base from 100,000 to 4 million users in 15 months (3900% growth), 
          with referrals accounting for 35% of daily sign-ups at its peak (SaaSQuatch, 2023).</li>
          
          <li><strong>Leveraging Existing Platforms:</strong> Similar to Airbnb's Craigslist integration, PayPal gained early traction by becoming the preferred 
          payment method for eBay sellers, effectively accessing an established user base without starting from scratch.</li>
          
          <li><strong>Exclusive Launches & Targeted Communities:</strong> Facebook's campus-by-campus expansion strategy created exclusivity that drove demand, 
          growing to over 1 million users in its first year. Similarly, Clubhouse used an invite-only beta with celebrities to generate hype in 2020.</li>
          
          <li><strong>Content and Influencer Marketing:</strong> Many startups build audiences through educational content or influencer partnerships that draw 
          potential users. SaaS companies often use blogs and webinars to attract their target audience, while mobile apps leverage social media influencers 
          to showcase their product.</li>
          
          <li><strong>Superior Product Experience:</strong> Perhaps most fundamental is creating a product so compelling that users naturally recommend it to others. 
          Slack's obsessive focus on user feedback and experience created a tool people enthusiastically shared with colleagues, driving organic growth without 
          heavy marketing expenditure.</li>
        </ul>

        <h3>Why Many Startups Fail to Reach 1%</h3>
        
        {/* FIGURE 5 */}
        <div className="figure-container">
          <div className="chart-wrapper">
            <StartupFailureCauses />
          </div>
          <p className="figure-caption">Figure 5: Startup Failure Causes - Pie chart showing percentage breakdown of primary failure causes</p>
        </div>
        
        <p>For every success story, hundreds of startups fail to gain initial traction. The primary failure modes include:</p>
        
        <ul>
          <li><strong>No Product-Market Fit:</strong> The leading cause of startup failure (42%) is building products that don't address genuine market needs 
          (Embroker, 2024). Without solving a meaningful problem for users, no amount of marketing can create sustainable growth.</li>
          
          <li><strong>Ineffective Marketing & Awareness:</strong> About 14% of startups fail due to poor marketing strategies (Embroker, 2024). Even promising 
          products may die unknown if teams cannot efficiently reach their target audience.</li>
          
          <li><strong>Running Out of Funding:</strong> Nearly 29% of failures occur when startups exhaust capital before gaining sufficient users or revenue 
          (Embroker, 2024). This risk is particularly acute for consumer startups that prioritize user growth before monetization.</li>
          
          <li><strong>Strong Competitors:</strong> Approximately 19% of startup failures cite competition as a major factor (Embroker, 2024). Established players 
          can quickly copy innovative features or leverage their advantages to neutralize newcomers' differentiation.</li>
          
          <li><strong>Team and Execution Issues:</strong> About 23% of failures stem from inadequate teams (Embroker, 2024). Building scalable products and 
          adapting to market feedback requires diverse skills and cohesion that many founding teams lack.</li>
        </ul>

        <h3>Scaling from 1% to 20% Market Share: Entering the Mainstream</h3>
        
        <p>Achieving 1% represents an important milestone, but the journey to mainstream adoption (around 20% market share) introduces new challenges. 
        According to Deloitte analysis, "More than 80% of start-ups fail because they are unable to adapt an emergent (niche) product to the mainstream market" (Deloitte, 2023). 
        In other words, only about 1 in 5 of those who capture an initial niche will successfully "cross the chasm" to wider adoption.</p>
        
        <h3>Key Challenges in the Scaling Phase</h3>
        
        {/* FIGURE 6 */}
        <div className="figure-container">
          <div className="chart-wrapper">
            <ScalingPhaseChallenges />
          </div>
          <p className="figure-caption">Figure 6: Scaling Phase Challenges - Quadrant analysis showing difficulty and business impact of key challenges</p>
        </div>
        
        <ul>
          <li><strong>Crossing the Chasm:</strong> As conceptualized by Geoffrey Moore, the needs and expectations of early adopters often differ significantly from the early majority. 
          Products that appeal to innovators or niche users may lack features, reliability, or social proof required by mainstream customers. Companies must evolve their offerings to bridge this gap or risk plateauing after the early adopter phase.</li>
          
          <li><strong>Scaling Operations and Infrastructure:</strong> Growing from thousands to millions of users strains technology infrastructure, customer support, supply chains, and internal processes. 
          This phase typically requires transforming from a nimble startup into a more structured organization with experienced leadership and formalized procedures. Companies may fail by scaling too slowly (frustrating users with degraded service) or too quickly (burning cash and compromising culture).</li>
          
          <li><strong>Intensified Competition:</strong> A startup that proves a market opportunity and captures initial share inevitably attracts competitive responses. 
          Incumbents may launch rival products, leverage bundling strategies, or use pricing power to defend their territory. The competitive landscape becomes more challenging precisely when the company needs to accelerate growth. Many startups that looked promising at 1% market share falter when confronting well-resourced competitors during the push to 20%.</li>
          
          <li><strong>Rising Customer Acquisition Costs:</strong> Early growth often comes through efficient channels—viral adoption among enthusiasts or organic discovery. 
          As companies target mainstream adoption, they typically must expand marketing efforts and pursue less accessible customer segments. The "low-hanging fruit" of early adopters is exhausted, requiring new strategies and often higher acquisition costs to convince more resistant customers.</li>
          
          <li><strong>Organizational Growing Pains:</strong> Scaling toward 20% market share frequently demands exponential team growth, introducing challenges in leadership, culture, and coordination. 
          The founding team that excelled at invention might struggle with the different skills needed to manage a large, complex organization. Companies can implode due to internal issues even after achieving strong market positions if they cannot effectively mature their organizations.</li>
          
          <li><strong>Regulatory and Public Scrutiny:</strong> Larger market presence attracts attention from regulators, media, and the public. 
          Issues like data privacy, content moderation, labor practices, or competitive concerns become more prominent. Managing these external challenges adds complexity that early-stage companies rarely experience.</li>
        </ul>
        
        <p>The scaling phase has a high casualty rate, with many startups either failing completely or becoming stuck in niches. 
        While early traction centers on agile experimentation and product-market fit, scaling demands operational excellence, strategic expansion, and often substantial additional funding.</p>
      </section>
      
      <section className="case-studies">
        <h2>5 Case Studies: Successful Market Penetration Strategies</h2>
        
        {/* FIGURE 7 */}
        <div className="figure-container">
          <div className="chart-wrapper">
            <GrowthTimelineComparison />
          </div>
          <p className="figure-caption">Figure 7: Growth Timeline Comparison - Visual comparison of market share growth trajectories for successful tech companies</p>
        </div>
        
        <p>Several companies have successfully navigated the journey from zero to meaningful market share:</p>
        
        <ul>
          <li><strong>Google Chrome:</strong> Launched in 2008 when Microsoft's Internet Explorer dominated browsers, Chrome grew from 0% to approximately 15% market share by the end of 2010, eventually reaching 31% worldwide share by mid-2012 (Nira, 2023) and surpassing 70% a decade after launch. Key success factors included substantially better performance, easy adoption (free download), and Google's ability to promote Chrome through its popular services.</li>
          
          <li><strong>Salesforce:</strong> Beginning as a small player in the CRM market dominated by Siebel Systems, Salesforce's cloud-based SaaS model disrupted the industry by eliminating on-premise installation requirements. Over 15-20 years, Salesforce grew to become the leading CRM vendor globally, holding approximately 21.8% market share by 2023 (Backlinko, 2023). This gradual but sustained growth leveraged first-mover advantage in cloud CRM, continuous product expansion, and increasing switching costs as customers became dependent on the platform.</li>
          
          <li><strong>Zoom:</strong> Prior to 2020, Zoom competed in a crowded videoconferencing market with modest market share. The COVID-19 pandemic dramatically accelerated adoption, with daily meeting participants growing from 10 million in late 2019 to 300 million by April 2020 (Business of Apps, 2023). Market share jumped from 26% in 2020 to 48.7% in 2021 (99firms, 2023), rapidly exceeding the 20% threshold. This case illustrates how external catalysts combined with product readiness can create extraordinary scaling opportunities.</li>
          
          <li><strong>Amazon Web Services (AWS):</strong> Launched in 2006 as the first major Infrastructure-as-a-Service platform, AWS initially represented a minimal portion of enterprise IT spending. By leveraging first-mover advantage, continuous service expansion, and massive infrastructure investment, AWS grew to become the dominant cloud provider, holding around 32% market share in cloud services (TechAhead Corp, 2023) and even reaching a dominant 44% share at one point.</li>
          
          <li><strong>Facebook:</strong> In 2005-2006, MySpace dominated social networking while Facebook was restricted to college campuses. Facebook's strategy of starting within exclusive networks before expanding, combined with a cleaner user experience, gradually attracted users away from competitors. By 2008, Facebook overtook MySpace in users (Forbes, 2022), and by 2012, MySpace had "virtually no market share" remaining (Our World in Data, 2023).</li>
        </ul>
      </section>
      
      <section className="framework">
        <h2>6 Proposed Framework: Key Success Factors for Market Share Growth</h2>
        
        {/* FIGURE 8 */}
        <div className="figure-container">
          <div className="chart-wrapper">
            <EcommerceMarketShareEvolution />
          </div>
          <p className="figure-caption">Figure 8: E-commerce Market Share Evolution - Stacked bar chart showing the evolution of e-commerce market share from 2005-2023</p>
        </div>
        
        <p>Startups that successfully achieve initial traction exhibit several distinguishing characteristics:</p>
        
        <ul>
          <li><strong>Genuine Product-Market Fit:</strong> Successful startups identify and address real market gaps, often solving problems in ways that are dramatically better than existing solutions.</li>
          <li><strong>Focused Target Segments:</strong> Rather than attempting to serve everyone immediately, breakthrough startups often start with a well-defined beachhead market.</li>
          <li><strong>Exceptional User Experience:</strong> Products that achieve 1% typically deliver experiences that users find substantially easier, more delightful, or more convenient than alternatives.</li>
          <li><strong>Agile Adaptation:</strong> Many eventual success stories evolved significantly based on user feedback.</li>
          <li><strong>Strong Execution:</strong> Behind successful products are capable, persistent teams that build quickly and creatively drive distribution.</li>
          <li><strong>Adequate Capital Management:</strong> Having sufficient runway to iterate toward product-market fit is crucial.</li>
          <li><strong>Favorable Timing:</strong> An often underappreciated factor is market timing.</li>
        </ul>
        
        {/* FIGURE 9 */}
        <div className="figure-container">
          <div className="chart-wrapper">
            <SuccessFactorMatrix />
          </div>
          <p className="figure-caption">Figure 9: Success Factor Matrix - Comparative analysis of success factors across initial traction and scaling phases</p>
        </div>
      </section>
      
      <section className="conclusion">
        <h2>7 Conclusion and Implications</h2>
        
        <p>Both the initial traction and scaling phases present formidable challenges for technology companies, though with different characteristics. 
        Considering the evidence:</p>
        
        {/* FIGURE 10 */}
        <div className="figure-container">
          <div className="chart-wrapper">
            <StatisticalProbabilityChart />
          </div>
          <p className="figure-caption">Figure 10: Statistical Probability Chart - Visualization of startup attrition rates through growth stages</p>
        </div>
        
        <ul>
          <li>The 0% to 1% phase presents the steeper statistical challenge, with approximately 90% of startups failing to achieve meaningful market presence.</li>
          <li>The 1% to 20% phase presents different but equally formidable difficulties, with the challenges shifting from creation to competition and operational scaling.</li>
        </ul>
        
        <p>From an overall probability perspective, capturing the first 1% appears to be the more daunting challenge due to the sheer number of startups that never achieve this milestone. 
        However, scaling from 1% to 20% represents a different type of challenge—one that tests an established company's ability to become an industry leader rather than merely a viable participant.</p>
      </section>
      
      <section className="references">
        <h2>8 References</h2>
        <ul>
          <li>99firms. (2023). Zoom Statistics 2023. Retrieved from https://99firms.com/blog/zoom-statistics/</li>
          <li>Backlinko. (2023). Salesforce Revenue and Market Share Statistics. Retrieved from https://backlinko.com/salesforce-stats</li>
          <li>Blogging Wizard. (2023). Amazon Statistics. Retrieved from https://bloggingwizard.com/amazon-statistics/</li>
          <li>Business of Apps. (2023). Zoom Revenue and Usage Statistics. Retrieved from https://www.businessofapps.com/data/zoom-statistics/</li>
          <li>Connell, A. (2024). TikTok Statistics: Revenue, Users & Engagement Stats. Retrieved from https://adamconnell.me/tiktok-statistics/</li>
          <li>Deloitte. (2023). Crossing the Valley of Death: Scaling. Deloitte Financial Services. Retrieved from https://www.deloitte.com/uk/en/Industries/financial-services/blogs/early-stage-start-ups-challenges-scaling.html</li>
          <li>Embroker. (2024). Startup Statistics 2024. Retrieved from https://www.embroker.com/blog/startup-statistics/</li>
          <li>FirstRound Review. (2022). From 0 to $1B: Slack's Founder Shares Their Epic Launch Strategy. Retrieved from https://review.firstround.com/from-0-to-1b-slacks-founder-shares-their-epic-launch-strategy/</li>
          <li>Forbes. (2022). Why Facebook Triumphed Over All Other Social Networks. Retrieved from https://www.forbes.com/sites/gilpress/2018/04/08/why-facebook-triumphed-over-all-other-social-networks/</li>
          <li>GrowthHackers. (2022). Airbnb Growth Study. Retrieved from https://growthhackers.com/growth-studies/airbnb/</li>
          <li>GrowthList. (2023). Startup Failure Statistics. Retrieved from https://growthlist.co/startup-failure-statistics/</li>
          <li>Hackernoon. (2022). How Airbnb Hacked Craigslist for Viral Growth. Retrieved from https://hackernoon.com/how-airbnb-hacked-craigslist-for-viral-growth-24l35eg</li>
          <li>Investopedia. (2022). The Story of Instagram: The Rise of the #1 Photo-Sharing App. Retrieved from https://www.investopedia.com/articles/investing/102615/story-instagram-rise-1-photo0sharing-app.asp</li>
          <li>KickStartSideHustle. (2023). How Slack Got From 0 to $1.12B and 285K Users in the First Year. Retrieved from https://kickstartsidehustle.com/how-slack-got-from-0-to-1-12-b-and-285k-users-in-the-first-year-marketing-strategies-and-psychology/</li>
          <li>NFX. (2023). 70 Percent of Value in Tech is Driven by Network Effects. Retrieved from https://www.nfx.com/post/70-percent-value-network-effects</li>
          <li>Nira. (2023). Chrome History: From 0 to 70% Market Share. Retrieved from https://nira.com/chrome-history/</li>
          <li>Our World in Data. (2023). The Rise of Social Media. Retrieved from https://ourworldindata.org/rise-of-social-media</li>
          <li>PetFoodIndustry. (2022). Infographic: Chewy E-commerce Pet Food Sales 2011-2018. Retrieved from https://www.petfoodindustry.com/pet-food-market/article/15465842/infographic-chewy-e-commerce-pet-food-sales-2011-2018</li>
          <li>Public. (2023). As Amazon Turns 30, E-commerce Share of Retail is Flattening. Retrieved from https://public.com/posts/as-amazon-turns-30-e-commerce-share-of-retail-is-flattening-is-it-a-trend-1587243635</li>
          <li>Reddit. (2023). US iPhone Market Share Jumps to 55% as Android Shipments Fall. Retrieved from https://www.reddit.com/r/apple/comments/15c6gq8/us_iphone_market_share_jumps_to_55_as_android/</li>
          <li>SaaSQuatch. (2023). Dropbox Customer Referral Program By The Numbers. Retrieved from https://www.saasquatch.com/blog/dropbox-customer-referral-program-by-the-numbers/</li>
          <li>Shah, D. (2022). Startups: Why A Real Market Of A Few Is Better Than A Mythical Market of Millions. OnStartups. Retrieved from https://www.onstartups.com/tabid/3339/bid/2338/Startups-Why-A-Real-Market-Of-A-Few-Is-Better-Than-A-Mythical-Market-of-Millions.aspx</li>
          <li>Statista. (2023). Chewy Brand Profile in the United States. Retrieved from https://www.statista.com/forecasts/1328398/chewy-pet-supply-online-shops-brand-profile-in-the-united-states</li>
          <li>TechAhead Corp. (2023). History of AWS: From Humble Beginnings to Global Dominance. Retrieved from https://www.techaheadcorp.com/knowledge-center/history-of-aws/</li>
          <li>Visual Capitalist. (2022). Amazon's Dominance in Ecommerce. Retrieved from https://www.visualcapitalist.com/chart-shows-amazons-dominance-ecommerce/</li>
          <li>World Economic Forum. (2018). Android is 10 Years Old: Here's How It Captured the Smartphone Market. Retrieved from https://www.weforum.org/stories/2018/10/android-is-10-years-old-here-s-how-it-captured-the-smartphone-market</li>
        </ul>
      </section>
      
      <footer>
        <p>© {new Date().getFullYear()} | Visualizations powered by React and D3.js</p>
      </footer>
    </div>
  );
}

export default App; 