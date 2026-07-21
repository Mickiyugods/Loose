import { ScrollReveal } from "@/components/scroll-reveal";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">
              <span className="lime-gradient">Privacy Policy</span>
            </h1>
            <p className="text-muted text-sm">Last updated: July 19, 2026</p>
          </div>
        </ScrollReveal>

        <div className="space-y-8 text-sm text-muted leading-relaxed">
          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              Loose (&quot;we,&quot; &quot;our,&quot; or &quot;the Platform&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you access or use our decentralized AI agent platform on Robinhood Chain. By using Loose, you agree to the practices described in this policy.
            </p>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Information We Collect</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-white/80 mb-1">Wallet Information</h3>
                <p>When you connect your wallet, we collect your public wallet address. We do not have access to your private keys, seed phrases, or wallet passwords.</p>
              </div>
              <div>
                <h3 className="font-medium text-white/80 mb-1">On-Chain Data</h3>
                <p>All transactions, agent deployments, and trading activities are recorded on Robinhood Chain and are publicly accessible by nature of blockchain technology. This data includes transaction hashes, contract interactions, and token balances.</p>
              </div>
              <div>
                <h3 className="font-medium text-white/80 mb-1">Usage Data</h3>
                <p>We may collect anonymized usage data such as pages visited, features used, browser type, and device information to improve our platform and user experience.</p>
              </div>
            </div>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide, operate, and maintain the Loose platform and its features</li>
              <li>To process and facilitate agent deployments and on-chain transactions</li>
              <li>To improve, personalize, and optimize the user experience</li>
              <li>To monitor platform performance, detect bugs, and prevent abuse</li>
              <li>To communicate important updates, security alerts, or changes to our services</li>
            </ul>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Data Sharing and Disclosure</h2>
            <p className="mb-3">We do not sell, rent, or trade your personal information to third parties. We may share information only in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white/80">Blockchain Transparency:</strong> On-chain data is inherently public and accessible to anyone on Robinhood Chain.</li>
              <li><strong className="text-white/80">Legal Obligations:</strong> We may disclose information if required by law, regulation, or valid legal process.</li>
              <li><strong className="text-white/80">Security:</strong> We may share data to investigate fraud, security breaches, or violations of our Terms of Service.</li>
            </ul>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information. However, no method of electronic transmission or storage is completely secure. While we strive to protect your data, we cannot guarantee absolute security. Your wallet security is your responsibility — never share your private keys or seed phrases with anyone.
            </p>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Third-Party Services</h2>
            <p>
              Our platform may integrate with third-party services such as wallet providers, blockchain explorers, and analytics tools. These services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of third-party services.
            </p>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Cookies and Tracking</h2>
            <p>
              We may use essential cookies and local storage to maintain your session, remember your wallet connection, and ensure the platform functions correctly. We do not use advertising or tracking cookies.
            </p>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Disconnect your wallet and stop using the platform at any time</li>
              <li>Request information about the data we hold about you</li>
              <li>Request deletion of off-chain data we may have collected</li>
              <li>Opt out of non-essential communications</li>
            </ul>
            <p className="mt-3">Note: On-chain data is immutable and cannot be deleted due to the nature of blockchain technology.</p>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Your continued use of Loose after changes are posted constitutes your acceptance of the revised policy.
            </p>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Contact</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please reach out to us on{" "}
              <a href="https://x.com/trylooseagent" target="_blank" rel="noopener noreferrer" className="text-lime hover:underline">
                Twitter / X (@trylooseagent)
              </a>.
            </p>
          </section></ScrollReveal>
        </div>
      </div>
    </div>
  );
}
