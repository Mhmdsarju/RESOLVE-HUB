import React from "react";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";

const TermsAndConditionsPage: React.FC = () => {
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

                <div className="overflow-hidden rounded-3xl border border-[#E7DDD3] bg-[#FBF6EC] shadow-xl shadow-[#4B3932]/10">
                    <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#4B3932] via-[#5A463D] to-[#79665B] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
                        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#D8C4A8]/10 blur-3xl" />

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
                                        Legal &amp; Compliance
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 sm:flex">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>

                                <div>
                                    <div className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
                                        Terms of Service
                                    </div>

                                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                                        Terms and Conditions
                                    </h1>

                                    <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
                                        These Terms and Conditions ("Terms") govern your
                                        access to and use of the ResolveHub platform,
                                        website, APIs, monitoring services, integrations,
                                        software, and related services (collectively, the
                                        "Services") provided by ResolveHub ("ResolveHub",
                                        "we", "us", or "our").
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
                                        Acceptance of These Terms
                                    </h2>
                                </div>

                                <p>
                                    By creating an account, accessing, or using the
                                    Services, you agree to be bound by these Terms and
                                    our Privacy Policy.
                                </p>

                                <p className="mt-4">
                                    If you use ResolveHub on behalf of an organization,
                                    you represent that you have authority to bind that
                                    organization to these Terms. In that case,
                                    "you" and "your" also refer to that organization
                                    where applicable.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        2
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Eligibility
                                    </h2>
                                </div>

                                <p>
                                    You may use the Services only if you are legally
                                    capable of entering into a binding agreement under
                                    applicable law and have the authority required to
                                    use the Services.
                                </p>

                                <p className="mt-4">
                                    If your access is provided by an organization,
                                    your use of ResolveHub may also be subject to
                                    that organization's internal policies and access
                                    controls.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        3
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        ResolveHub Account
                                    </h2>
                                </div>

                                <p>
                                    You are responsible for providing accurate account
                                    information and maintaining the security of your
                                    credentials.
                                </p>

                                <p className="mt-4">
                                    You must not share authentication credentials in a
                                    manner that permits unauthorized access to your
                                    account or organization.
                                </p>

                                <p className="mt-4">
                                    You are responsible for activity performed through
                                    your account unless the activity resulted from
                                    unauthorized access that was not reasonably caused
                                    by your failure to protect your credentials.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        4
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Organizations, Teams, and Permissions
                                    </h2>
                                </div>

                                <p>
                                    ResolveHub allows organizations to create teams,
                                    invite members, assign roles, manage permissions,
                                    and control access to operational information.
                                </p>

                                <p className="mt-4">
                                    Organization administrators are responsible for
                                    appropriately configuring user access and ensuring
                                    that members receive only the permissions they
                                    require.
                                </p>

                                <p className="mt-4">
                                    Organizations are responsible for ensuring that
                                    users invited to their ResolveHub environment are
                                    authorized to access the organization's data.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        5
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Incidents and Operational Content
                                    </h2>
                                </div>

                                <p>
                                    ResolveHub provides functionality for creating and
                                    managing incidents, including incident details,
                                    severity, priority, tasks, timelines,
                                    notifications, collaboration, war rooms,
                                    comments, and related operational information.
                                </p>

                                <p className="mt-4">
                                    You are responsible for ensuring that information
                                    submitted to ResolveHub is accurate to the extent
                                    reasonably required for your operational use and
                                    that you have the necessary rights and permissions
                                    to submit such information.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        6
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Monitoring Integrations
                                    </h2>
                                </div>

                                <p>
                                    ResolveHub may integrate with monitoring and
                                    observability systems, including Prometheus and
                                    the ResolveHub Agent.
                                </p>

                                <p className="mt-4">
                                    You are responsible for configuring integrations,
                                    credentials, endpoints, permissions, and network
                                    access correctly and securely.
                                </p>

                                <p className="mt-4">
                                    You must only connect monitoring systems and
                                    workloads that you are authorized to monitor.
                                </p>

                                <p className="mt-4">
                                    ResolveHub is not responsible for outages,
                                    inaccurate data, delays, failures, or changes
                                    originating from third-party monitoring systems or
                                    infrastructure outside our reasonable control.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        7
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        ResolveHub Agent
                                    </h2>
                                </div>

                                <p>
                                    The ResolveHub Agent is a customer-deployed
                                    monitoring component designed to observe
                                    containerized workloads and generate alerts from
                                    predefined operational conditions.
                                </p>

                                <p className="mt-4">
                                    The Agent may require access to the Docker
                                    environment in which it is deployed. You are solely
                                    responsible for determining whether such access is
                                    appropriate and for securely configuring and
                                    deploying the Agent.
                                </p>

                                <p className="mt-4">
                                    You are responsible for ensuring that the Agent is
                                    deployed only in environments and against
                                    workloads for which you have appropriate
                                    authorization.
                                </p>

                                <p className="mt-4">
                                    ResolveHub does not guarantee that the Agent will
                                    detect every possible failure, log pattern,
                                    application error, container failure, or
                                    infrastructure problem.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        8
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Alerts and Incidents
                                    </h2>
                                </div>

                                <p>
                                    Alerts received through ResolveHub integrations
                                    may be processed according to configured alert
                                    rules, routing rules, priorities, and severity
                                    levels.
                                </p>

                                <p className="mt-4">
                                    An alert recovery or resolved monitoring state
                                    does not necessarily mean that a corresponding
                                    incident has been automatically closed. Incident
                                    closure remains subject to the applicable
                                    workflow and authorized user actions.
                                </p>

                                <p className="mt-4">
                                    ResolveHub does not guarantee that every alert will
                                    be received, processed, routed, or delivered
                                    without interruption or delay.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        9
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        AI Incident Copilot
                                    </h2>
                                </div>

                                <p>
                                    ResolveHub may provide AI-powered functionality
                                    intended to assist with incident investigation,
                                    summaries, recommendations, analysis, or related
                                    operational tasks.
                                </p>

                                <p className="mt-4">
                                    AI-generated information may be incomplete,
                                    inaccurate, outdated, or inappropriate for a
                                    particular situation. You are responsible for
                                    independently evaluating AI-generated information
                                    before relying on it for operational or business
                                    decisions.
                                </p>

                                <p className="mt-4">
                                    AI functionality is an assistance tool and does
                                    not replace qualified human judgment, operational
                                    procedures, security controls, or professional
                                    advice.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        10
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Subscriptions and Plans
                                    </h2>
                                </div>

                                <p>
                                    ResolveHub may provide free and paid subscription
                                    plans. Features, limits, pricing, billing
                                    frequency, and other applicable conditions may
                                    differ between plans.
                                </p>

                                <p className="mt-4">
                                    The specific pricing and commercial terms presented
                                    at the time of purchase or in an applicable order
                                    form will govern the relevant subscription.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        11
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Payments and Billing
                                    </h2>
                                </div>

                                <p>
                                    For paid Services, you agree to provide accurate
                                    billing information and authorize applicable
                                    charges associated with your selected plan.
                                </p>

                                <p className="mt-4">
                                    Payments may be processed through third-party
                                    payment service providers. Your use of those
                                    payment services may also be subject to the
                                    provider's applicable terms and policies.
                                </p>

                                <p className="mt-4">
                                    Unless otherwise expressly stated in an applicable
                                    purchase agreement, taxes, duties, or other
                                    government charges may be your responsibility where
                                    required by law.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        12
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Cancellation and Refunds
                                    </h2>
                                </div>

                                <p>
                                    You may cancel a subscription according to the
                                    cancellation process made available through the
                                    Services or applicable commercial agreement.
                                </p>

                                <p className="mt-4">
                                    Refund eligibility, if any, will be determined by
                                    the applicable purchase terms, order form,
                                    subscription terms, or refund policy communicated
                                    at the time of purchase.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        13
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Acceptable Use
                                    </h2>
                                </div>

                                <p>You agree not to use the Services to:</p>

                                <ul className="mt-5 space-y-3">
                                    {[
                                        "Violate applicable laws or regulations.",
                                        "Access systems or data without authorization.",
                                        "Interfere with or disrupt the Services.",
                                        "Attempt to bypass security or access controls.",
                                        "Introduce malware, malicious code, or harmful content.",
                                        "Abuse monitoring integrations or infrastructure.",
                                        "Impersonate another person or organization.",
                                        "Use the Services to infringe third-party rights.",
                                        "Attempt to reverse engineer restricted parts of the Services.",
                                        "Use the Services in a way that could materially harm other users or the platform.",
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
                                        14
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Customer Content
                                    </h2>
                                </div>

                                <p>
                                    You retain your rights in content and information
                                    that you submit to ResolveHub ("Customer
                                    Content").
                                </p>

                                <p className="mt-4">
                                    You grant ResolveHub a limited, non-exclusive,
                                    worldwide license to host, store, reproduce,
                                    transmit, process, and otherwise use Customer
                                    Content only as reasonably necessary to provide,
                                    secure, maintain, and improve the Services and
                                    fulfill our obligations under these Terms.
                                </p>

                                <p className="mt-4">
                                    You represent that you have the rights,
                                    permissions, and lawful authority necessary for us
                                    to process Customer Content for these purposes.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        15
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Intellectual Property
                                    </h2>
                                </div>

                                <p>
                                    The Services, including software, interfaces,
                                    designs, branding, documentation, workflows,
                                    technology, and other materials provided by
                                    ResolveHub, are owned by or licensed to ResolveHub
                                    and are protected by applicable intellectual
                                    property laws.
                                </p>

                                <p className="mt-4">
                                    Except as expressly permitted by these Terms, you
                                    may not copy, modify, distribute, sell, lease,
                                    sublicense, reverse engineer, or create derivative
                                    works from the Services.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        16
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Confidentiality
                                    </h2>
                                </div>

                                <p>
                                    Each party may receive confidential information
                                    belonging to the other party. Each party agrees to
                                    use reasonable care to protect confidential
                                    information and use it only for purposes related
                                    to the Services and applicable agreement.
                                </p>

                                <p className="mt-4">
                                    Confidentiality obligations do not apply to
                                    information that is publicly available without
                                    breach, independently developed, lawfully received
                                    from another source, or required to be disclosed by
                                    law.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        17
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Third-Party Services
                                    </h2>
                                </div>

                                <p>
                                    The Services may depend on or integrate with
                                    third-party services, infrastructure, APIs,
                                    payment providers, monitoring platforms, AI
                                    providers, communication services, or other
                                    external systems.
                                </p>

                                <p className="mt-4">
                                    Third-party services are governed by their own
                                    terms and policies. ResolveHub is not responsible
                                    for the availability, functionality, security,
                                    accuracy, or performance of third-party services
                                    outside our reasonable control.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        18
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Service Availability
                                    </h2>
                                </div>

                                <p>
                                    We aim to provide reliable and secure Services but
                                    do not guarantee that the Services will always be
                                    available, uninterrupted, error-free, or free from
                                    vulnerabilities.
                                </p>

                                <p className="mt-4">
                                    Maintenance, upgrades, security events,
                                    infrastructure failures, third-party outages,
                                    network failures, force majeure events, and other
                                    circumstances may affect availability.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        19
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Security Responsibilities
                                    </h2>
                                </div>

                                <p>
                                    You are responsible for maintaining appropriate
                                    security controls within your own environment,
                                    including credentials, API keys, monitoring
                                    systems, infrastructure, Docker environments,
                                    networks, devices, and personnel access.
                                </p>

                                <p className="mt-4">
                                    You must not intentionally expose credentials,
                                    secrets, private keys, access tokens, or other
                                    sensitive authentication information through
                                    incident descriptions, comments, integrations, or
                                    other fields unless such processing is expressly
                                    intended and appropriately secured.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        20
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Suspension and Termination
                                    </h2>
                                </div>

                                <p>
                                    We may suspend or terminate access to the Services
                                    where reasonably necessary to protect the
                                    Services, users, third parties, or our systems,
                                    including in cases of material violation of these
                                    Terms, security threats, fraud, unlawful activity,
                                    or non-payment.
                                </p>

                                <p className="mt-4">
                                    You may stop using the Services or terminate your
                                    account according to the applicable account or
                                    subscription process.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        21
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Effect of Termination
                                    </h2>
                                </div>

                                <p>
                                    Following termination, your right to access the
                                    Services may cease. Certain provisions of these
                                    Terms, including provisions relating to
                                    intellectual property, confidentiality,
                                    disclaimers, limitations of liability,
                                    indemnification, dispute resolution, and other
                                    provisions intended by their nature to survive,
                                    will continue to apply.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        22
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Disclaimers
                                    </h2>
                                </div>

                                <p>
                                    To the maximum extent permitted by applicable law,
                                    the Services are provided on an "as available"
                                    and "as is" basis.
                                </p>

                                <p className="mt-4">
                                    ResolveHub does not warrant that the Services will
                                    satisfy every operational requirement, detect every
                                    incident, prevent every failure, produce
                                    uninterrupted monitoring, or provide completely
                                    accurate AI-generated results.
                                </p>

                                <p className="mt-4">
                                    ResolveHub should not be used as the sole mechanism
                                    for life-critical, safety-critical, or otherwise
                                    high-risk decisions without appropriate independent
                                    safeguards.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        23
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Limitation of Liability
                                    </h2>
                                </div>

                                <p>
                                    To the maximum extent permitted by applicable law,
                                    ResolveHub and its directors, officers,
                                    employees, affiliates, and service providers will
                                    not be liable for indirect, incidental, special,
                                    consequential, exemplary, or punitive damages, or
                                    for loss of profits, revenue, business,
                                    goodwill, data, or anticipated savings arising
                                    from or relating to the Services.
                                </p>

                                <p className="mt-4">
                                    Any applicable limitation of liability will be
                                    subject to mandatory rights and remedies that
                                    cannot lawfully be excluded or limited.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        24
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Indemnification
                                    </h2>
                                </div>

                                <p>
                                    To the extent permitted by applicable law, you
                                    agree to defend, indemnify, and hold harmless
                                    ResolveHub and its affiliates, officers,
                                    employees, and representatives from claims,
                                    liabilities, damages, losses, and expenses arising
                                    from your unlawful use of the Services, violation
                                    of these Terms, infringement of third-party
                                    rights, or unauthorized use of monitoring systems
                                    or data.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        25
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Changes to These Terms
                                    </h2>
                                </div>

                                <p>
                                    We may update these Terms from time to time to
                                    reflect changes to the Services, legal
                                    requirements, security practices, or business
                                    operations.
                                </p>

                                <p className="mt-4">
                                    Updated Terms will be made available through the
                                    Services or another reasonable communication
                                    method. Your continued use of the Services after
                                    the effective date of updated Terms constitutes
                                    acceptance of the updated Terms to the extent
                                    permitted by applicable law.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        26
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Dispute Resolution
                                    </h2>
                                </div>

                                <p>
                                    Before initiating formal proceedings, the parties
                                    should make reasonable efforts to resolve disputes
                                    through good-faith communication.
                                </p>

                                <p className="mt-4">
                                    Where applicable, disputes may be subject to
                                    mediation, arbitration, or another dispute
                                    resolution mechanism specified in an applicable
                                    commercial agreement.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        27
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Severability
                                    </h2>
                                </div>

                                <p>
                                    If any provision of these Terms is determined to be
                                    invalid or unenforceable, that provision will be
                                    enforced to the maximum extent permitted by law,
                                    and the remaining provisions will remain in full
                                    force and effect.
                                </p>
                            </section>

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-sm font-black text-white shadow-sm">
                                        28
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#4B3932]">
                                        Entire Agreement
                                    </h2>
                                </div>

                                <p>
                                    These Terms, together with the Privacy Policy and
                                    any applicable order form, subscription agreement,
                                    or other written agreement between you and
                                    ResolveHub, constitute the agreement governing
                                    your use of the Services with respect to the
                                    applicable subject matter.
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
                                                Your Continued Use of ResolveHub
                                            </h2>

                                            <p className="mt-2 leading-7 text-stone-500">
                                                By continuing to access or use ResolveHub,
                                                you acknowledge that you have read,
                                                understood, and agreed to these Terms and
                                                the applicable policies governing the
                                                Services.
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

export default TermsAndConditionsPage;