from db.database import SessionLocal
from db.models import Startup, Challenge, ChallengeRequirement


# ============================================================
# STARTUPS
# ============================================================

STARTUPS = [
    {
        "id": "ST-001",
        "name": "SwachhTech AI Solutions",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 2,
        "active_litigation": False,
        "capabilities": "AI waste detection, computer vision, waste segregation, route optimization, offline inference"
    },
    {
        "id": "ST-002",
        "name": "GreenRoute Systems",
        "dpiit_registered": True,
        "trl_level": 8,
        "past_deployments": 5,
        "active_litigation": False,
        "capabilities": "vehicle route optimization, fleet management, GPS tracking, traffic analytics, municipal logistics"
    },
    {
        "id": "ST-003",
        "name": "AquaSense Technologies",
        "dpiit_registered": True,
        "trl_level": 8,
        "past_deployments": 4,
        "active_litigation": False,
        "capabilities": "water leak detection, IoT sensors, pressure monitoring, smart water meters, predictive analytics"
    },
    {
        "id": "ST-004",
        "name": "UrbanVision Labs",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "computer vision, CCTV analytics, traffic monitoring, object detection, smart city platforms"
    },
    {
        "id": "ST-005",
        "name": "FarmPulse Technologies",
        "dpiit_registered": True,
        "trl_level": 6,
        "past_deployments": 2,
        "active_litigation": False,
        "capabilities": "crop monitoring, agricultural computer vision, soil sensors, crop disease detection, drone analytics"
    },
    {
        "id": "ST-006",
        "name": "MediScan AI",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "medical image analysis, AI diagnostics, healthcare analytics, clinical decision support"
    },
    {
        "id": "ST-007",
        "name": "SolarGrid Analytics",
        "dpiit_registered": True,
        "trl_level": 8,
        "past_deployments": 6,
        "active_litigation": False,
        "capabilities": "solar monitoring, energy analytics, predictive maintenance, IoT sensors, renewable energy management"
    },
    {
        "id": "ST-008",
        "name": "FloodWatch Technologies",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "flood prediction, rainfall monitoring, water-level sensors, early warning systems, GIS"
    },
    {
        "id": "ST-009",
        "name": "StreetSmart IoT",
        "dpiit_registered": True,
        "trl_level": 8,
        "past_deployments": 7,
        "active_litigation": False,
        "capabilities": "smart street lighting, IoT controllers, energy monitoring, remote device management"
    },
    {
        "id": "ST-010",
        "name": "CyberShield GovTech",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 4,
        "active_litigation": False,
        "capabilities": "cybersecurity, government security monitoring, threat detection, SIEM, vulnerability assessment"
    },
    {
        "id": "ST-011",
        "name": "CleanAir Analytics",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "air quality monitoring, pollution sensors, environmental analytics, IoT monitoring"
    },
    {
        "id": "ST-012",
        "name": "TransitFlow AI",
        "dpiit_registered": True,
        "trl_level": 8,
        "past_deployments": 5,
        "active_litigation": False,
        "capabilities": "public transport optimization, route planning, fleet tracking, traffic prediction, mobility analytics"
    },
    {
        "id": "ST-013",
        "name": "HealthReach Digital",
        "dpiit_registered": True,
        "trl_level": 6,
        "past_deployments": 2,
        "active_litigation": False,
        "capabilities": "telemedicine, mobile healthcare, patient records, rural healthcare platforms, appointment management"
    },
    {
        "id": "ST-014",
        "name": "DrainGuard Systems",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "drain monitoring, blockage detection, IoT sensors, underground infrastructure monitoring"
    },
    {
        "id": "ST-015",
        "name": "ParkEase Technologies",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 4,
        "active_litigation": False,
        "capabilities": "smart parking, parking sensors, license plate recognition, mobile applications, payment systems"
    },
    {
        "id": "ST-016",
        "name": "AgroDrone Innovations",
        "dpiit_registered": True,
        "trl_level": 6,
        "past_deployments": 1,
        "active_litigation": False,
        "capabilities": "agricultural drones, crop imaging, multispectral analysis, precision agriculture"
    },
    {
        "id": "ST-017",
        "name": "WaterWorks AI",
        "dpiit_registered": True,
        "trl_level": 8,
        "past_deployments": 5,
        "active_litigation": False,
        "capabilities": "water quality monitoring, leak detection, smart meters, IoT telemetry, predictive maintenance"
    },
    {
        "id": "ST-018",
        "name": "VisionTraffic Labs",
        "dpiit_registered": True,
        "trl_level": 8,
        "past_deployments": 6,
        "active_litigation": False,
        "capabilities": "traffic camera analytics, vehicle detection, congestion prediction, computer vision, signal optimization"
    },
    {
        "id": "ST-019",
        "name": "EcoSort Robotics",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 2,
        "active_litigation": False,
        "capabilities": "robotic waste sorting, computer vision, material classification, recycling automation"
    },
    {
        "id": "ST-020",
        "name": "RuralConnect Digital",
        "dpiit_registered": False,
        "trl_level": 5,
        "past_deployments": 1,
        "active_litigation": False,
        "capabilities": "rural connectivity, mobile applications, digital services, offline data collection"
    },
    {
        "id": "ST-021",
        "name": "EnergyPulse Systems",
        "dpiit_registered": True,
        "trl_level": 8,
        "past_deployments": 4,
        "active_litigation": False,
        "capabilities": "smart electricity meters, energy monitoring, demand forecasting, grid analytics"
    },
    {
        "id": "ST-022",
        "name": "CropGuard AI",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "crop disease detection, agricultural AI, computer vision, farmer mobile applications"
    },
    {
        "id": "ST-023",
        "name": "MedSupply Logistics",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 4,
        "active_litigation": False,
        "capabilities": "medical logistics, cold chain monitoring, GPS tracking, inventory management, supply chain analytics"
    },
    {
        "id": "ST-024",
        "name": "SmartSchool Systems",
        "dpiit_registered": True,
        "trl_level": 6,
        "past_deployments": 2,
        "active_litigation": False,
        "capabilities": "school management, attendance analytics, student safety, biometric systems, education dashboards"
    },
    {
        "id": "ST-025",
        "name": "GeoInfra Analytics",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "GIS mapping, infrastructure monitoring, satellite imagery, asset management, spatial analytics"
    },
    {
        "id": "ST-026",
        "name": "AirSense Networks",
        "dpiit_registered": True,
        "trl_level": 6,
        "past_deployments": 2,
        "active_litigation": False,
        "capabilities": "air quality sensors, IoT networks, pollution monitoring, environmental dashboards"
    },
    {
        "id": "ST-027",
        "name": "MobilityMatrix",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "mobility analytics, traffic simulation, public transport planning, route optimization"
    },
    {
        "id": "ST-028",
        "name": "SolarSight AI",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "solar panel inspection, computer vision, thermal imaging, renewable energy analytics"
    },
    {
        "id": "ST-029",
        "name": "WasteLess Technologies",
        "dpiit_registered": True,
        "trl_level": 6,
        "past_deployments": 1,
        "active_litigation": False,
        "capabilities": "waste tracking, recycling analytics, collection monitoring, citizen reporting"
    },
    {
        "id": "ST-030",
        "name": "SecureData India",
        "dpiit_registered": True,
        "trl_level": 8,
        "past_deployments": 5,
        "active_litigation": False,
        "capabilities": "data security, encryption, identity management, cloud security, government cybersecurity"
    },
    {
        "id": "ST-031",
        "name": "FarmSense IoT",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "soil sensors, irrigation monitoring, agricultural IoT, weather analytics, crop monitoring"
    },
    {
        "id": "ST-032",
        "name": "UrbanPulse Analytics",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 4,
        "active_litigation": False,
        "capabilities": "smart city analytics, IoT platforms, urban dashboards, predictive analytics"
    },
    {
        "id": "ST-033",
        "name": "HealthVision Labs",
        "dpiit_registered": True,
        "trl_level": 6,
        "past_deployments": 1,
        "active_litigation": False,
        "capabilities": "medical computer vision, health screening, AI diagnostics, healthcare analytics"
    },
    {
        "id": "ST-034",
        "name": "RainGrid Analytics",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "rainfall prediction, flood analytics, weather sensors, climate risk monitoring"
    },
    {
        "id": "ST-035",
        "name": "EVFleet Technologies",
        "dpiit_registered": True,
        "trl_level": 8,
        "past_deployments": 5,
        "active_litigation": False,
        "capabilities": "electric vehicle fleet management, charging optimization, GPS tracking, energy analytics"
    },
    {
        "id": "ST-036",
        "name": "CivicConnect Labs",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 4,
        "active_litigation": False,
        "capabilities": "citizen grievance systems, mobile applications, government service platforms, analytics"
    },
    {
        "id": "ST-037",
        "name": "InfraWatch AI",
        "dpiit_registered": True,
        "trl_level": 8,
        "past_deployments": 3,
        "active_litigation": False,
        "capabilities": "infrastructure inspection, computer vision, road monitoring, structural analytics, drones"
    },
    {
        "id": "ST-038",
        "name": "BluePlanet Water",
        "dpiit_registered": False,
        "trl_level": 5,
        "past_deployments": 1,
        "active_litigation": False,
        "capabilities": "water purification, water quality sensors, sanitation monitoring"
    },
    {
        "id": "ST-039",
        "name": "CityShield Security",
        "dpiit_registered": True,
        "trl_level": 6,
        "past_deployments": 2,
        "active_litigation": True,
        "capabilities": "public safety analytics, surveillance systems, incident detection, security monitoring"
    },
    {
        "id": "ST-040",
        "name": "LogiChain Bharat",
        "dpiit_registered": True,
        "trl_level": 7,
        "past_deployments": 4,
        "active_litigation": False,
        "capabilities": "supply chain optimization, logistics tracking, fleet management, inventory analytics"
    },
]


# ============================================================
# GOVERNMENT CHALLENGES
# ============================================================

CHALLENGES = [
    {
        "title": "Smart Waste Management",
        "description": "Improve municipal waste collection using AI, computer vision and route optimization.",
        "domain": "Solid Waste Management",
        "budget_inr": 2500000,
        "duration_days": 90,
        "requirements": [
            "AI based waste detection",
            "Dynamic vehicle route optimization",
            "Real-time collection monitoring",
            "Offline operation with cellular synchronization",
        ],
    },
    {
        "title": "Municipal Water Leakage Detection",
        "description": "Detect water pipeline leaks early and reduce non-revenue water across the city.",
        "domain": "Water Management",
        "budget_inr": 3000000,
        "duration_days": 120,
        "requirements": [
            "IoT water pressure sensors",
            "Automated leak detection",
            "Real-time water network monitoring",
            "Predictive maintenance analytics",
        ],
    },
    {
        "title": "Urban Traffic Congestion Monitoring",
        "description": "Use computer vision and analytics to reduce congestion at major city intersections.",
        "domain": "Urban Mobility",
        "budget_inr": 3500000,
        "duration_days": 120,
        "requirements": [
            "Traffic camera analytics",
            "Vehicle detection",
            "Congestion prediction",
            "Traffic signal optimization",
        ],
    },
    {
        "title": "Smart Street Lighting",
        "description": "Reduce municipal electricity consumption through intelligent street lighting.",
        "domain": "Energy Management",
        "budget_inr": 2000000,
        "duration_days": 90,
        "requirements": [
            "IoT lighting controllers",
            "Remote monitoring",
            "Energy consumption analytics",
            "Automated brightness control",
        ],
    },
    {
        "title": "City Air Quality Monitoring",
        "description": "Deploy distributed sensors and analytics to monitor urban air pollution.",
        "domain": "Environment",
        "budget_inr": 1800000,
        "duration_days": 90,
        "requirements": [
            "Air quality sensors",
            "Real-time pollution monitoring",
            "Environmental dashboard",
            "Pollution trend analytics",
        ],
    },
    {
        "title": "Crop Disease Early Detection",
        "description": "Help farmers detect crop diseases using AI-based image analysis.",
        "domain": "Agriculture",
        "budget_inr": 2200000,
        "duration_days": 100,
        "requirements": [
            "Crop image analysis",
            "Computer vision disease detection",
            "Mobile application",
            "Offline field operation",
        ],
    },
    {
        "title": "Rural Telemedicine Platform",
        "description": "Improve access to healthcare for citizens in remote rural communities.",
        "domain": "Healthcare",
        "budget_inr": 2800000,
        "duration_days": 120,
        "requirements": [
            "Telemedicine platform",
            "Mobile healthcare application",
            "Patient record management",
            "Low bandwidth operation",
        ],
    },
    {
        "title": "Flood Early Warning System",
        "description": "Provide early warnings to citizens and authorities during extreme rainfall and flooding.",
        "domain": "Disaster Management",
        "budget_inr": 4000000,
        "duration_days": 150,
        "requirements": [
            "Water level sensors",
            "Rainfall monitoring",
            "Flood prediction",
            "Automated warning system",
        ],
    },
    {
        "title": "Municipal Solar Asset Monitoring",
        "description": "Monitor government-owned solar installations and identify performance issues.",
        "domain": "Renewable Energy",
        "budget_inr": 1600000,
        "duration_days": 90,
        "requirements": [
            "Solar asset monitoring",
            "Predictive maintenance",
            "Performance analytics",
            "Remote diagnostics",
        ],
    },
    {
        "title": "Drainage Blockage Detection",
        "description": "Detect blocked drainage infrastructure before it causes urban flooding.",
        "domain": "Urban Infrastructure",
        "budget_inr": 2200000,
        "duration_days": 90,
        "requirements": [
            "Drain monitoring sensors",
            "Blockage detection",
            "Infrastructure dashboard",
            "Predictive maintenance",
        ],
    },
    {
        "title": "Smart Parking Management",
        "description": "Reduce parking congestion and improve utilization of municipal parking spaces.",
        "domain": "Urban Mobility",
        "budget_inr": 1500000,
        "duration_days": 75,
        "requirements": [
            "Parking occupancy sensors",
            "Real-time parking availability",
            "Mobile application",
            "Parking analytics",
        ],
    },
    {
        "title": "Government Cybersecurity Monitoring",
        "description": "Improve detection and response to cybersecurity incidents across municipal systems.",
        "domain": "Cybersecurity",
        "budget_inr": 4500000,
        "duration_days": 150,
        "requirements": [
            "Threat detection",
            "Security event monitoring",
            "Vulnerability assessment",
            "Security incident dashboard",
        ],
    },
    {
        "title": "Public Transport Optimization",
        "description": "Optimize public bus routes and fleet operations to reduce delays and improve service.",
        "domain": "Public Transport",
        "budget_inr": 3000000,
        "duration_days": 120,
        "requirements": [
            "Fleet GPS tracking",
            "Route optimization",
            "Traffic-aware scheduling",
            "Public transport analytics",
        ],
    },
    {
        "title": "Municipal Road Condition Monitoring",
        "description": "Automatically identify road damage and prioritize maintenance activities.",
        "domain": "Urban Infrastructure",
        "budget_inr": 2500000,
        "duration_days": 100,
        "requirements": [
            "Computer vision road inspection",
            "Pothole detection",
            "GIS mapping",
            "Infrastructure maintenance dashboard",
        ],
    },
    {
        "title": "Electric Municipal Fleet Optimization",
        "description": "Improve utilization and charging efficiency of electric municipal vehicles.",
        "domain": "Electric Mobility",
        "budget_inr": 3200000,
        "duration_days": 120,
        "requirements": [
            "Electric fleet tracking",
            "Charging optimization",
            "Energy consumption analytics",
            "Fleet route optimization",
        ],
    },
]


# ============================================================
# SEED DATABASE
# ============================================================

def seed_database():
    db = SessionLocal()

    try:
        # -----------------------------
        # STARTUPS
        # -----------------------------

        startups_added = 0

        for data in STARTUPS:
            existing = (
                db.query(Startup)
                .filter(Startup.id == data["id"])
                .first()
            )

            if existing:
                continue

            startup = Startup(
                id=data["id"],
                name=data["name"],
                dpiit_registered=data["dpiit_registered"],
                trl_level=data["trl_level"],
                past_deployments=data["past_deployments"],
                active_litigation=data["active_litigation"],
                capabilities=data["capabilities"],
            )

            db.add(startup)
            startups_added += 1

        db.commit()

        # -----------------------------
        # CHALLENGES
        # -----------------------------

        challenges_added = 0
        requirements_added = 0

        for data in CHALLENGES:
            existing = (
                db.query(Challenge)
                .filter(Challenge.title == data["title"])
                .first()
            )

            if existing:
                continue

            challenge = Challenge(
                title=data["title"],
                description=data["description"],
                domain=data["domain"],
                budget_inr=data["budget_inr"],
                duration_days=data["duration_days"],
            )

            db.add(challenge)
            db.commit()
            db.refresh(challenge)

            challenges_added += 1

            for requirement in data["requirements"]:
                db.add(
                    ChallengeRequirement(
                        challenge_id=challenge.id,
                        requirement=requirement,
                    )
                )
                requirements_added += 1

            db.commit()

        print("===================================")
        print("DATABASE SEED COMPLETE")
        print("===================================")
        print(f"Startups added: {startups_added}")
        print(f"Challenges added: {challenges_added}")
        print(f"Requirements added: {requirements_added}")
        print("===================================")

    except Exception as e:
        db.rollback()
        print("ERROR:", e)

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()