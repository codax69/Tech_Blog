window.TechPulsePosts = [
    {
        id: 'artificial-intelligence', category: 'Artificial Intelligence', title: 'Artificial intelligence, without the fog',
        excerpt: 'A useful way to think about AI is as a set of methods for making machines perform tasks that call for judgment.',
        date: '2026-10-14', readTime: 5, tags: ['AI', 'Systems', 'Foundations'],
        art: 'network', tint: '#e8e7dc', ink: '#343c37',
        intro: 'Artificial intelligence is not one machine or one technique. It is a broad field concerned with building systems that perceive, reason, learn or act toward a goal.',
        sections: [
            ['A field, not a product', 'The term describes a research area as much as a family of technologies. A rules engine, a route planner and a language model may all be called AI, but they solve different problems and make different assumptions. It helps to ask what a system observes, what objective it is given and what kind of output it produces.'],
            ['Rules and learning', 'Some systems follow logic written by people. Others infer patterns from examples, then use those patterns on new inputs. Modern applications often combine both approaches with search, databases or carefully designed constraints. The result is a system whose behavior depends on its data and its design, not just on a label.'],
            ['Where judgment still matters', 'An AI output is not automatically a reliable answer. Performance depends on the task, the inputs and how success is measured. For consequential decisions, people need ways to inspect, challenge and correct a system rather than treating its output as a verdict.']
        ],
        takeaways: ['AI is an umbrella term for distinct approaches.', 'Start with the task and the system’s objective, not the marketing label.', 'Reliability and oversight depend on the context of use.'],
        examples: ['A route planner comparing possible paths.', 'A document classifier sorting messages for review.', 'A speech recognizer turning audio into text.'],
        sources: [
            ['Artificial Intelligence: A Modern Approach', 'Stuart Russell and Peter Norvig', 'Pearson', 'https://aima.cs.berkeley.edu/'],
            ['AI Index Report', 'Stanford Institute for Human-Centered AI', 'Stanford University', 'https://aiindex.stanford.edu/report/'],
            ['AI Risk Management Framework', 'National Institute of Standards and Technology', 'NIST', 'https://www.nist.gov/itl/ai-risk-management-framework']
        ]
    },
    {
        id: 'machine-learning', category: 'Machine Learning', title: 'Machine learning is pattern-finding with a purpose',
        excerpt: 'Models learn relationships from examples. What they learn, and what they miss, depends on the data and the task.',
        date: '2026-10-14', readTime: 6, tags: ['Data', 'Models', 'Training'],
        art: 'scatter', tint: '#e5e8dc', ink: '#3b453c',
        intro: 'In traditional programming, a person writes the rules. In machine learning, a model adjusts internal parameters using examples so it can make useful predictions on cases it has not seen.',
        sections: [
            ['Examples become a model', 'A training process compares a model’s predictions with known answers and adjusts its parameters to reduce an error measure. The model is not memorizing a universal truth; it is fitting a particular dataset under a particular objective.'],
            ['Training is not evaluation', 'A model can perform well on its training examples and still fail on new ones. A separate test set gives a better estimate of generalization, while validation data helps choose among designs. Data leakage, skewed samples and an unsuitable metric can make results look better than they are.'],
            ['Choose the measure first', 'Accuracy is only one way to describe a model. In an imbalanced classification problem, precision and recall may reveal more about the mistakes that matter. The right measure follows from the cost of false alarms and missed cases.']
        ],
        takeaways: ['Training adjusts model parameters against examples.', 'A held-out test set helps check performance on unseen data.', 'Metrics should reflect the consequences of different errors.'],
        examples: ['Estimating a home value from its features.', 'Classifying a message as spam or not spam.', 'Grouping similar observations without predefined labels.'],
        sources: [
            ['Machine Learning Crash Course', 'Google', 'Google for Developers', 'https://developers.google.com/machine-learning/crash-course'],
            ['User Guide', 'The scikit-learn developers', 'scikit-learn', 'https://scikit-learn.org/stable/user_guide.html'],
            ['Deep Learning', 'Ian Goodfellow, Yoshua Bengio and Aaron Courville', 'MIT Press', 'https://www.deeplearningbook.org/']
        ]
    },
    {
        id: 'cloud-computing', category: 'Cloud Computing', title: 'Cloud computing is someone else’s hardware, carefully arranged',
        excerpt: 'The cloud is a way to provision computing resources over a network, with tradeoffs in control, cost and responsibility.',
        date: '2026-10-14', readTime: 6, tags: ['Infrastructure', 'Networks', 'Operations'],
        art: 'cloud', tint: '#e8e4d9', ink: '#3c403b',
        intro: 'Cloud computing lets an organization obtain computing resources on demand over a network. The practical change is not that hardware disappears; it is that someone else operates much of it and exposes it as a service.',
        sections: [
            ['Services at different layers', 'Infrastructure services provide building blocks such as virtual machines, storage and networks. Platform services manage more of the runtime. Software services deliver a complete application. As you move up these layers, you give up some control in exchange for less operational work.'],
            ['Elasticity is a design choice', 'Resources can often be increased or reduced as demand changes. That can help with variable workloads, but poorly managed resources can remain active and accumulate cost. Budgets, alerts and a clear owner are part of a cloud design, not an afterthought.'],
            ['Shared responsibility', 'A provider secures parts of the underlying service; customers remain responsible for choices such as identity, data handling and configuration. The exact boundary changes by service. Reading the provider’s responsibility model is more useful than assuming that “in the cloud” means “taken care of.”']
        ],
        takeaways: ['Cloud services trade direct control for managed infrastructure.', 'Elastic resources still need budgets and ownership.', 'Security duties vary by service and configuration.'],
        examples: ['Hosting an application on a managed platform.', 'Keeping backups in remote object storage.', 'Running a scheduled data-processing job on demand.'],
        sources: [
            ['The NIST Definition of Cloud Computing (SP 800-145)', 'Peter Mell and Timothy Grance', 'NIST', 'https://doi.org/10.6028/NIST.SP.800-145'],
            ['AWS Well-Architected Framework', 'Amazon Web Services', 'AWS', 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html'],
            ['Azure Architecture Center', 'Microsoft', 'Microsoft Learn', 'https://learn.microsoft.com/azure/architecture/']
        ]
    },
    {
        id: 'internet-of-things', category: 'Internet of Things', title: 'The internet of things begins with a tiny computer',
        excerpt: 'Connected devices gather signals from the physical world, then send them somewhere useful, and hopefully secure.',
        date: '2026-10-14', readTime: 5, tags: ['Devices', 'Sensors', 'Security'],
        art: 'iot', tint: '#e2e8df', ink: '#38443d',
        intro: 'An internet-connected sensor or appliance is a small computer with a job in the physical world. It measures or controls something, communicates over a network and depends on software that needs maintenance.',
        sections: [
            ['From signal to service', 'A sensor measures a physical quantity such as temperature. A device can filter or package that reading, send it through a network and hand it to a service that stores or acts on it. Each step introduces decisions about timing, bandwidth and failure handling.'],
            ['Protocols set expectations', 'Protocols let devices and services agree on how messages are structured and delivered. MQTT, for example, uses a publish-and-subscribe model. A protocol can make communication interoperable, but it does not by itself guarantee that a device is safe or that a message is trustworthy.'],
            ['Small devices need long care', 'A device deployed in a wall or factory may remain in place for years. Secure setup, unique credentials, update mechanisms and a clear end-of-support plan matter as much as the first connection. A sensor that cannot be maintained becomes a liability.']
        ],
        takeaways: ['IoT joins sensing, connectivity and software.', 'Communication standards do not replace device security.', 'Plan for updates and end-of-support before deployment.'],
        examples: ['A building sensor reporting room temperature.', 'A meter sending usage readings to a utility.', 'A machine reporting vibration for maintenance review.'],
        sources: [
            ['NISTIR 8259A: IoT Device Cybersecurity Capability Core Baseline', 'Michael Fagan et al.', 'NIST', 'https://doi.org/10.6028/NIST.IR.8259A'],
            ['MQTT Version 5.0', 'OASIS MQTT Technical Committee', 'OASIS', 'https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html'],
            ['Internet of Things', 'International Telecommunication Union', 'ITU', 'https://www.itu.int/en/ITU-T/IoT/Pages/default.aspx']
        ]
    },
    {
        id: 'blockchain', category: 'Blockchain', title: 'A blockchain is a shared log with rules about change',
        excerpt: 'The interesting part is not the chain of blocks. It is how a group agrees on which entries to accept.',
        date: '2026-10-14', readTime: 6, tags: ['Distributed systems', 'Cryptography', 'Networks'],
        art: 'chain', tint: '#ece3d9', ink: '#483d37',
        intro: 'A blockchain is a data structure used by a distributed system to record ordered transactions. Cryptographic links make edits detectable; a consensus mechanism determines which proposed history participants accept.',
        sections: [
            ['Copies and agreement', 'Participants keep or verify copies of a ledger. When new transactions arrive, the network needs a process to decide their order and validity. That process is consensus, and its design shapes who can participate, how quickly updates settle and what kinds of attacks are possible.'],
            ['Hashes reveal changes', 'A hash is a fixed-length digest computed from data. Linking records through hashes means a later change affects the links that follow it. This is useful for tamper evidence, but it does not prove that the original input was true.'],
            ['Not every shared database needs one', 'Blockchains can be useful when multiple parties need to coordinate without relying on one operator. They also add complexity, replication and governance questions. If one trusted organization already controls the data, a conventional database may be simpler and easier to operate.']
        ],
        takeaways: ['Consensus is how participants agree on accepted history.', 'Tamper evidence does not validate the truth of input data.', 'Compare the design with a conventional database before choosing it.'],
        examples: ['A public network recording transfers of a digital asset.', 'A permissioned ledger shared among organizations.', 'A smart contract applying published transaction rules.'],
        sources: [
            ['Bitcoin: A Peer-to-Peer Electronic Cash System', 'Satoshi Nakamoto', 'Bitcoin.org', 'https://bitcoin.org/bitcoin.pdf'],
            ['NISTIR 8202: Blockchain Technology Overview', 'Dylan Yaga et al.', 'NIST', 'https://doi.org/10.6028/NIST.IR.8202'],
            ['Ethereum Developer Documentation', 'Ethereum Foundation', 'ethereum.org', 'https://ethereum.org/developers/docs/']
        ]
    },
    {
        id: 'cybersecurity', category: 'Cybersecurity', title: 'Cybersecurity is a practice of reducing risk',
        excerpt: 'Good security is less about a magic product and more about knowing what matters, what can go wrong and how to recover.',
        date: '2026-10-14', readTime: 5, tags: ['Risk', 'Privacy', 'Operations'],
        art: 'shield', tint: '#e0e8e4', ink: '#36443e',
        intro: 'Cybersecurity protects systems and information from unauthorized access, disruption and misuse. It is an ongoing practice because software, threats and organizational needs keep changing.',
        sections: [
            ['Know what needs protection', 'A risk-based approach starts with assets, likely threats and the impact of failure. That makes it possible to prioritize safeguards instead of treating every system as equally important. The process should fit the organization’s size and obligations.'],
            ['Prevent, detect, respond', 'Access controls and secure configuration can reduce the chance of an incident. Monitoring can reveal activity that prevention missed. A tested response plan helps people contain damage, restore services and communicate clearly when something does happen.'],
            ['Security has people in it', 'A technical control can fail when it is confusing, poorly maintained or disconnected from daily work. Clear ownership, useful training and routine updates make security more durable than a one-time installation.']
        ],
        takeaways: ['Prioritize security work by risk and impact.', 'Combine prevention with detection and recovery.', 'Assign ownership for updates, access and incident response.'],
        examples: ['Using multifactor authentication for administrator accounts.', 'Maintaining an inventory of software and devices.', 'Practicing restoration from a known-good backup.'],
        sources: [
            ['Cybersecurity Framework 2.0', 'National Institute of Standards and Technology', 'NIST', 'https://www.nist.gov/cyberframework'],
            ['OWASP Top 10', 'OWASP Foundation', 'OWASP', 'https://owasp.org/www-project-top-ten/'],
            ['StopRansomware Guide', 'Cybersecurity and Infrastructure Security Agency', 'CISA', 'https://www.cisa.gov/stopransomware/ransomware-guide']
        ]
    },
    {
        id: 'big-data', category: 'Big Data', title: 'Big data is a systems problem before it is a size problem',
        excerpt: 'When one machine is no longer enough, distributed systems split work and bring the pieces back together.',
        date: '2026-10-14', readTime: 6, tags: ['Data', 'Distributed systems', 'Analytics'],
        art: 'data', tint: '#e5e6dc', ink: '#39443e',
        intro: '“Big data” usually describes data whose volume, speed or variety pushes beyond a team’s ordinary tools. Handling it well requires choices about storage, processing and the questions worth asking.',
        sections: [
            ['Split work across machines', 'Distributed processing frameworks divide a job into smaller tasks that can run across a cluster. The system then combines partial results. This can make a large computation practical, but it also introduces network delays, coordination and failures to handle.'],
            ['Storage and processing differ', 'A distributed file system stores data across machines and manages replication. A processing engine reads that data and performs operations. Keeping these roles clear helps explain why moving data can be expensive and why computation is often brought closer to storage.'],
            ['More data is not automatically better', 'Large datasets can contain duplicates, gaps and measurement bias. A reliable pipeline records where data came from, how it changed and what it can legitimately support. The best analysis starts with a well-posed question, not with the biggest cluster available.']
        ],
        takeaways: ['Distributed computation trades simpler local work for coordination.', 'Storage systems and processing engines solve different problems.', 'Data quality and provenance matter at every scale.'],
        examples: ['Aggregating server logs across many machines.', 'Processing a large collection of scientific observations.', 'Training a model from data collected by multiple services.'],
        sources: [
            ['MapReduce: Simplified Data Processing on Large Clusters', 'Jeffrey Dean and Sanjay Ghemawat', 'Google Research', 'https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/'],
            ['Apache Hadoop Documentation', 'Apache Software Foundation', 'Apache Hadoop', 'https://hadoop.apache.org/docs/stable/'],
            ['Apache Spark Documentation', 'Apache Software Foundation', 'Apache Spark', 'https://spark.apache.org/docs/latest/']
        ]
    },
    {
        id: 'web3', category: 'Web 3.0', title: '“Web 3.0” means different things to different people',
        excerpt: 'A useful conversation starts by separating the semantic web, decentralized identity and blockchain-based services.',
        date: '2026-10-14', readTime: 6, tags: ['Web', 'Identity', 'Standards'],
        art: 'web', tint: '#e9e4d9', ink: '#454139',
        intro: 'Web 3.0 is an ambiguous label. It has described ideas about machine-readable web data, and more recently services built around blockchains and user-held assets. Those ideas overlap in conversation but are not the same technology.',
        sections: [
            ['The semantic web idea', 'The semantic web proposed ways to describe data so software could relate information across documents and services. Standards for linked data and structured identifiers address parts of that problem. They do not require a cryptocurrency or a blockchain.'],
            ['Identity standards are narrower', 'Decentralized identifiers and verifiable credentials define data models and protocols for identifiers or signed claims. Standards describe how systems can exchange information; they do not guarantee that a claim is accurate, a credential is accepted or a service is decentralized in practice.'],
            ['Ask what is actually decentralized', 'A product may use a public ledger while depending on centralized hosting, interfaces or governance. To evaluate a claim, identify who can change the rules, control access, hold user data and keep the service running. That is more precise than arguing over the label.']
        ],
        takeaways: ['Web 3.0 is an umbrella label, not a single standard.', 'Semantic web and blockchain-based approaches solve different problems.', 'Inspect control and governance, not just the technology named in a pitch.'],
        examples: ['Machine-readable data linked across sites.', 'A verifiable credential presented to a service.', 'A decentralized application that reads from a public ledger.'],
        sources: [
            ['The Semantic Web', 'Tim Berners-Lee, James Hendler and Ora Lassila', 'Scientific American', 'https://www.scientificamerican.com/article/the-semantic-web/'],
            ['Decentralized Identifiers (DIDs) v1.0', 'W3C Credentials Community Group', 'W3C', 'https://www.w3.org/TR/did-1.0/'],
            ['Verifiable Credentials Data Model v2.0', 'W3C Verifiable Credentials Working Group', 'W3C', 'https://www.w3.org/TR/vc-data-model-2.0/']
        ]
    },
    {
        id: 'quantum-computing', category: 'Quantum Computing', title: 'Quantum computers use a different set of physical rules',
        excerpt: 'Qubits make some computations possible in new ways, but they do not make every calculation faster.',
        date: '2026-10-14', readTime: 6, tags: ['Physics', 'Computing', 'Cryptography'],
        art: 'quantum', tint: '#e4e7e2', ink: '#35433e',
        intro: 'Quantum computing uses quantum states to represent and manipulate information. It is a distinct computing model, not a faster general-purpose replacement for classical machines.',
        sections: [
            ['Qubits and measurement', 'A qubit can be prepared in a state that combines possibilities before measurement. Quantum gates transform those states, and measurement yields classical outcomes. The probability of those outcomes is shaped by the computation’s sequence of gates.'],
            ['Algorithms are specialized', 'Quantum algorithms can offer advantages for particular mathematical tasks, under specific assumptions. They do not speed up every program. For a practical problem, the algorithm, the hardware and the cost of preparing and reading data all matter.'],
            ['Noise changes the engineering', 'Qubits are fragile and operations are imperfect. Error correction can protect logical information, but it requires additional physical resources. This is why current systems are active research platforms rather than drop-in replacements for everyday computers.']
        ],
        takeaways: ['Quantum computers are specialized, not universally faster.', 'Measurement produces classical outcomes from quantum states.', 'Noise and error correction are central engineering constraints.'],
        examples: ['Studying quantum chemistry with specialized algorithms.', 'Researching factoring and cryptographic risk.', 'Using quantum simulators to test small circuits.'],
        sources: [
            ['IBM Quantum Learning', 'IBM', 'IBM Quantum', 'https://learning.quantum.ibm.com/'],
            ['Quantum Computing', 'National Institute of Standards and Technology', 'NIST', 'https://www.nist.gov/quantum-information-science/quantum-computing'],
            ['Quantum AI', 'Google Quantum AI', 'Google Research', 'https://quantumai.google/']
        ]
    },
    {
        id: 'generative-ai', category: 'Generative AI', title: 'Generative AI makes outputs by learning patterns',
        excerpt: 'Text and image generators produce plausible continuations, not guaranteed facts. That difference matters.',
        date: '2026-10-14', readTime: 6, tags: ['Generative AI', 'Language models', 'Images'],
        art: 'generate', tint: '#ebe2d9', ink: '#4a3c35',
        intro: 'Generative AI refers to models that produce new material such as text, images, audio or code. Their outputs come from learned patterns in training data and the way a model is prompted or conditioned.',
        sections: [
            ['Different models, different methods', 'Language models commonly predict a next token from preceding context. Image generation systems may learn to reverse a noise process or use another generative method. The interface can look similar even when the underlying model works differently.'],
            ['Plausible is not verified', 'A model can generate fluent text that contains an error. It does not necessarily retrieve a source or check each claim before answering. Use it to draft, transform or explore ideas, then verify important details against evidence.'],
            ['People remain part of the workflow', 'Good use depends on the task and the review process. Consider whether inputs include private information, whether generated material needs attribution and how a mistake would affect someone. A clear human review step is especially important in high-stakes settings.']
        ],
        takeaways: ['Generative models produce outputs from learned patterns.', 'Fluent output should not be confused with verified information.', 'Review privacy, provenance and error impact for each use.'],
        examples: ['Drafting several alternatives for a short heading.', 'Creating an image variation from a text prompt.', 'Summarizing a document that a reviewer can inspect.'],
        sources: [
            ['Attention Is All You Need', 'Ashish Vaswani et al.', 'NeurIPS', 'https://arxiv.org/abs/1706.03762'],
            ['Generative Adversarial Nets', 'Ian Goodfellow et al.', 'NeurIPS', 'https://arxiv.org/abs/1406.2661'],
            ['Denoising Diffusion Probabilistic Models', 'Jonathan Ho, Ajay Jain and Pieter Abbeel', 'NeurIPS', 'https://arxiv.org/abs/2006.11239']
        ]
    }
];