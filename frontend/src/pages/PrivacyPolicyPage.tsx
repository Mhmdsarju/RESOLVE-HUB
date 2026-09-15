import React from "react";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";

const PrivacyPolicyPage: React.FC = () => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen bg-[#FAF6F0]">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                <button
                    onClick={handleBack}
                    className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[#E7DDD3] bg-[#FBF6EC] px-4 py-2.5 text-sm font-semibold text-[#4B3932] shadow-sm transition-all duration-200 hover:border-[#D8C4A8] hover:bg-[#F0E7D5] hover:shadow-md"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>

                <div className="relative overflow-hidden rounded-3xl border border-[#E7DDD3] bg-[#FBF6EC] shadow-xl shadow-[#4B3932]/10">
                    <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#D8C4A8]/20 blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#F0E7D5]/50 blur-3xl" />

                    <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#4B3932] via-[#5A463D] to-[#79665B] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
                        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-amber-200/10 blur-3xl" />

                        <div className="relative">
                            <div className="mb-7 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-lg backdrop-blur-sm">
                                    <ShieldCheck className="h-5 w-5 text-[#F0E7D5]" />
                                </div>

                                <div>
                                    <p className="text-sm font-bold tracking-wide text-[#F0E7D5]">
                                        ResolveHub
                                    </p>
                                    <p className="text-xs text-white/50">
                                        Privacy &amp; Data Protection
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 sm:flex">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>

                                <div>
                                    <div className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
                                        Privacy &amp; Data Protection
                                    </div>

                                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                                        Privacy Policy
                                    </h1>

                                    <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
                                        This Privacy Policy explains how ResolveHub
                                        ("ResolveHub", "we", "us", or "our") collects,
                                        uses, stores, discloses, and protects information
                                        when you access or use the ResolveHub platform,
                                        website, APIs, monitoring services, integrations,
                                        and related services (collectively, the
                                        "Services").
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
                        <div className="mx-auto max-w-4xl space-y-12 text-[15px] leading-7 text-stone-600">
                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        1
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Scope of This Privacy Policy
                                    </h2>
                                </div>

                                <p>
                                    This Privacy Policy applies to personal information
                                    processed through ResolveHub, including information
                                    associated with user accounts, organizations, teams,
                                    incidents, monitoring projects, integrations,
                                    notifications, audit records, subscriptions, and
                                    communications with us.
                                </p>

                                <p className="mt-4">
                                    ResolveHub is primarily designed as a business and
                                    organizational incident management platform. When an
                                    organization provides you access to ResolveHub, that
                                    organization may determine what information is
                                    submitted to the platform and how your access is
                                    managed.
                                </p>
                            </section>

                            <section>
                                <div className="mb-6 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        2
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Information We Collect
                                    </h2>
                                </div>

                                <div className="space-y-7">
                                    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 transition-all duration-200 hover:border-[#D8C4A8] hover:shadow-sm">
                                        <h3 className="text-lg font-bold text-[#4B3932]">
                                            2.1 Account Information
                                        </h3>
                                        <p className="mt-3">
                                            When you create or use an account, we may
                                            collect information such as your name, email
                                            address, password or authentication
                                            credentials, phone number where provided,
                                            profile information, organization
                                            affiliation, role, and account preferences.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 transition-all duration-200 hover:border-[#D8C4A8] hover:shadow-sm">
                                        <h3 className="text-lg font-bold text-[#4B3932]">
                                            2.2 Organization and Team Information
                                        </h3>
                                        <p className="mt-3">
                                            ResolveHub may process information relating
                                            to the organizations and teams you belong to,
                                            including organization names, team
                                            memberships, roles, permissions, invitations,
                                            and access-control information.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 transition-all duration-200 hover:border-[#D8C4A8] hover:shadow-sm">
                                        <h3 className="text-lg font-bold text-[#4B3932]">
                                            2.3 Incident and Operational Data
                                        </h3>
                                        <p className="mt-3">
                                            ResolveHub processes information submitted
                                            through the platform, including incident
                                            titles, descriptions, severity, priority,
                                            status, timelines, tasks, comments,
                                            war-room collaboration data, notifications,
                                            attachments, and other operational
                                            information entered by authorized users.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 transition-all duration-200 hover:border-[#D8C4A8] hover:shadow-sm">
                                        <h3 className="text-lg font-bold text-[#4B3932]">
                                            2.4 Monitoring and Integration Data
                                        </h3>
                                        <p className="mt-3">
                                            If you configure monitoring integrations,
                                            ResolveHub may receive monitoring events,
                                            alert payloads, labels, annotations, service
                                            information, timestamps, severity
                                            information, and relevant log-derived
                                            information.
                                        </p>

                                        <p className="mt-4">
                                            ResolveHub may support integrations such as
                                            Prometheus-based monitoring and the
                                            ResolveHub Agent. The information received
                                            through these integrations depends on the
                                            configuration made by your organization.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 transition-all duration-200 hover:border-[#D8C4A8] hover:shadow-sm">
                                        <h3 className="text-lg font-bold text-[#4B3932]">
                                            2.5 ResolveHub Agent Data
                                        </h3>
                                        <p className="mt-3">
                                            The ResolveHub Agent is designed to monitor
                                            containerized workloads and identify
                                            predefined operational conditions. The agent
                                            processes container information and logs
                                            within the environment where it is deployed
                                            and sends relevant alert information to
                                            ResolveHub according to its configuration.
                                        </p>

                                        <p className="mt-4">
                                            Organizations are responsible for determining
                                            which containers, logs, and operational
                                            information are made available to the agent.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 transition-all duration-200 hover:border-[#D8C4A8] hover:shadow-sm">
                                        <h3 className="text-lg font-bold text-[#4B3932]">
                                            2.6 AI and Copilot Information
                                        </h3>
                                        <p className="mt-3">
                                            ResolveHub may provide AI-powered incident
                                            assistance, including incident analysis,
                                            summaries, recommendations, or related
                                            functionality. Information submitted to
                                            these features may be processed to generate
                                            the requested output.
                                        </p>

                                        <p className="mt-4">
                                            Users and organizations should avoid
                                            submitting information to AI features that
                                            they are not authorized to process.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 transition-all duration-200 hover:border-[#D8C4A8] hover:shadow-sm">
                                        <h3 className="text-lg font-bold text-[#4B3932]">
                                            2.7 Payment and Subscription Information
                                        </h3>
                                        <p className="mt-3">
                                            If you subscribe to a paid ResolveHub plan,
                                            we may process subscription information,
                                            plan details, payment status, transaction
                                            identifiers, billing information, and
                                            related records.
                                        </p>

                                        <p className="mt-4">
                                            Payment card and other sensitive payment
                                            credentials may be processed directly by
                                            third-party payment providers rather than
                                            being stored by ResolveHub.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 transition-all duration-200 hover:border-[#D8C4A8] hover:shadow-sm">
                                        <h3 className="text-lg font-bold text-[#4B3932]">
                                            2.8 Technical and Usage Information
                                        </h3>
                                        <p className="mt-3">
                                            We may automatically collect technical
                                            information such as IP address, browser
                                            type, device information, operating system,
                                            authentication events, access times, pages
                                            or features used, error information, and
                                            other diagnostic data.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 transition-all duration-200 hover:border-[#D8C4A8] hover:shadow-sm">
                                        <h3 className="text-lg font-bold text-[#4B3932]">
                                            2.9 Communications
                                        </h3>
                                        <p className="mt-3">
                                            If you contact us, we may collect your name,
                                            email address, message contents, support
                                            requests, and other information you choose
                                            to provide.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        3
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        How We Use Information
                                    </h2>
                                </div>

                                <p>
                                    We may use information for the following purposes:
                                </p>

                                <ul className="mt-5 space-y-3">
                                    {[
                                        "Creating and managing user accounts.",
                                        "Providing organization and team functionality.",
                                        "Creating, processing, routing, and managing incidents.",
                                        "Providing monitoring and alert-management functionality.",
                                        "Sending incident and service notifications.",
                                        "Providing AI-powered incident assistance.",
                                        "Processing subscriptions and payments.",
                                        "Maintaining security and preventing unauthorized access.",
                                        "Detecting abuse, fraud, and security incidents.",
                                        "Maintaining audit and operational records.",
                                        "Improving reliability, performance, and functionality.",
                                        "Providing customer support.",
                                        "Complying with applicable legal obligations.",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-3 rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] px-4 py-3"
                                        >
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A78B72]" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        4
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Legal Basis for Processing
                                    </h2>
                                </div>

                                <p>
                                    Depending on the nature of the processing and
                                    applicable law, we may process personal information
                                    where processing is necessary to provide the
                                    Services, perform a contract, comply with a legal
                                    obligation, protect the security of the Services,
                                    pursue legitimate operational purposes, or based
                                    on consent where consent is required.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        5
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Organization-Controlled Data
                                    </h2>
                                </div>

                                <p>
                                    Where ResolveHub is used by an organization, the
                                    organization may control the information submitted
                                    to the Services and may determine user permissions,
                                    retention requirements, and access to organization
                                    data.
                                </p>

                                <p className="mt-4">
                                    If your ResolveHub account was created or provided
                                    by an organization, requests concerning
                                    organization-controlled data may need to be
                                    directed to that organization.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        6
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        How We Share Information
                                    </h2>
                                </div>

                                <p>
                                    We do not sell personal information for monetary
                                    consideration. We may disclose information in the
                                    following circumstances:
                                </p>

                                <ul className="mt-5 space-y-3">
                                    {[
                                        "To service providers that help us operate the Services, such as infrastructure, hosting, email, analytics, authentication, AI, and payment providers.",
                                        "To other users within an organization when permitted by the organization's configuration and access controls.",
                                        "Where necessary to comply with applicable law, legal process, or lawful government requests.",
                                        "To protect the rights, property, security, or safety of ResolveHub, our users, or others.",
                                        "In connection with a merger, acquisition, financing, restructuring, or sale of assets.",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-3 rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] px-4 py-3"
                                        >
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A78B72]" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        7
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Cookies and Similar Technologies
                                    </h2>
                                </div>

                                <p>
                                    ResolveHub may use cookies, local storage, session
                                    technologies, and similar mechanisms to maintain
                                    authentication sessions, remember preferences,
                                    improve security, understand service usage, and
                                    improve the Services.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        8
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Data Security
                                    </h2>
                                </div>

                                <p>
                                    We use reasonable technical and organizational
                                    measures designed to protect information against
                                    unauthorized access, alteration, disclosure,
                                    destruction, or loss.
                                </p>

                                <p className="mt-4">
                                    Security measures may include access controls,
                                    authentication mechanisms, encryption in transit,
                                    logging, monitoring, least-privilege principles,
                                    and other safeguards appropriate to the nature of
                                    the information.
                                </p>

                                <p className="mt-4">
                                    No method of transmission, storage, or electronic
                                    security can be guaranteed to be completely secure.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        9
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Data Retention
                                    </h2>
                                </div>

                                <p>
                                    We retain information for as long as reasonably
                                    necessary to provide the Services, maintain
                                    security, comply with legal obligations, resolve
                                    disputes, enforce agreements, maintain appropriate
                                    business records, and otherwise fulfill the
                                    purposes described in this Privacy Policy.
                                </p>

                                <p className="mt-4">
                                    Retention periods may vary depending on the type of
                                    information, account status, organizational
                                    settings, legal requirements, and operational
                                    requirements.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        10
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Data Deletion
                                    </h2>
                                </div>

                                <p>
                                    Subject to applicable law and legitimate business
                                    requirements, you may request deletion of personal
                                    information associated with your account.
                                </p>

                                <p className="mt-4">
                                    Certain information may need to be retained for
                                    legal, security, fraud-prevention, dispute
                                    resolution, accounting, backup, or other legitimate
                                    purposes.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        11
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Your Rights
                                    </h2>
                                </div>

                                <p>
                                    Subject to applicable law, you may have rights
                                    relating to your personal information, including
                                    rights to access, correction, updating, deletion,
                                    withdrawal of consent where applicable, and
                                    grievance or complaint resolution.
                                </p>

                                <p className="mt-4">
                                    The availability and scope of these rights may
                                    depend on applicable law, the nature of the
                                    processing, and whether the information is
                                    controlled by you or your organization.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        12
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        International Data Processing
                                    </h2>
                                </div>

                                <p>
                                    Depending on the infrastructure and service
                                    providers used by ResolveHub, information may be
                                    processed or stored in India or other jurisdictions
                                    where we or our service providers operate.
                                </p>

                                <p className="mt-4">
                                    Where required, we will take appropriate measures
                                    for lawful processing and transfer of personal
                                    information.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        13
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Third-Party Services
                                    </h2>
                                </div>

                                <p>
                                    ResolveHub may integrate with third-party services,
                                    including monitoring systems, payment providers,
                                    communication services, infrastructure providers,
                                    and AI services.
                                </p>

                                <p className="mt-4">
                                    Information processed by a third-party service may
                                    also be subject to that provider's privacy policy
                                    and terms. We encourage users to review the
                                    applicable third-party policies before enabling an
                                    integration.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        14
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Children's Privacy
                                    </h2>
                                </div>

                                <p>
                                    ResolveHub is intended for business and
                                    organizational use and is not directed toward
                                    children. We do not knowingly design the Services
                                    to collect personal information from children in
                                    violation of applicable law.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        15
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Changes to This Privacy Policy
                                    </h2>
                                </div>

                                <p>
                                    We may update this Privacy Policy from time to time
                                    to reflect changes in the Services, legal
                                    requirements, security practices, or business
                                    operations.
                                </p>

                                <p className="mt-4">
                                    When appropriate, we will provide notice of material
                                    changes through the Services or other reasonable
                                    communication channels.
                                </p>
                            </section>

                            <section>
                                <div className="relative overflow-hidden rounded-3xl border border-[#D8C4A8]/70 bg-gradient-to-br from-[#FBF6EC] via-[#F7F2E9] to-[#EFE5D7] p-7 shadow-sm sm:p-8">
                                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D8C4A8]/20 blur-3xl" />

                                    <div className="relative flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-white shadow-sm">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-black text-[#4B3932]">
                                                Privacy at ResolveHub
                                            </h2>

                                            <p className="mt-2 leading-7 text-stone-500">
                                                We are committed to handling information
                                                responsibly and using appropriate
                                                safeguards to protect the information
                                                processed through the Services.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="border-t border-[#E7DDD3] bg-[#F7F2E9] px-6 py-6 sm:px-10 lg:px-14">
                        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
                            <p className="text-xs leading-5 text-stone-400">
                                © {new Date().getFullYear()} ResolveHub. All rights reserved.
                            </p>

                            <button
                                onClick={handleBack}
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#4B3932] transition-colors hover:text-[#79665B]"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;