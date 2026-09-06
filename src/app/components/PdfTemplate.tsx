import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";
import { CVData } from "../cvData";

// Register fonts if needed (using built-in Helvetica by default for ATS safety)
// Helvetica is standard and 100% parseable.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    color: "#000",
  },
  title: {
    fontSize: 12,
    color: "#555",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 9,
    color: "#555",
  },
  link: {
    color: "#0056b3",
    textDecoration: "none",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#000",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 2,
    marginBottom: 8,
  },
  summaryText: {
    textAlign: "justify",
  },
  itemGroup: {
    marginBottom: 10,
  },
  itemHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: "#000",
  },
  itemSubtitle: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 10,
    color: "#333",
  },
  itemDate: {
    fontSize: 10,
    color: "#555",
  },
  bulletList: {
    marginTop: 4,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 3,
    alignItems: "flex-start",
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    textAlign: "justify",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  skillCategory: {
    width: "25%",
    fontFamily: "Helvetica-Bold",
  },
  skillItems: {
    flex: 1,
  },
  certRow: {
    marginBottom: 4,
  },
});

interface PdfTemplateProps {
  data: CVData;
  selected: Record<string, boolean>;
}

export const PdfTemplate: React.FC<PdfTemplateProps> = ({ data, selected }) => {
  const info = data.personalInfo;

  return (
    <Document title={`${info.name.replace(/ /g, "_")}_CV`} author={info.name}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{info.name.toUpperCase()}</Text>
          <Text style={styles.title}>{info.title}</Text>
          <View style={styles.contactRow}>
            <Text>{info.location}</Text>
            <Text>|</Text>
            <Text>{info.phone}</Text>
            <Text>|</Text>
            <Link src={`mailto:${info.email}`} style={styles.link}>
              {info.email}
            </Link>
            <Text>|</Text>
            <Link src={info.linkedin} style={styles.link}>
              {info.linkedinLabel}
            </Link>
          </View>
        </View>

        {/* Summary */}
        {selected["summary"] && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {selected["experience"] && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.itemGroup}>
                <View style={styles.itemHeaderRow}>
                  <View>
                    <Text style={styles.itemTitle}>{exp.role}</Text>
                    <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  </View>
                  <Text style={styles.itemDate}>{exp.dates}</Text>
                </View>
                <View style={styles.bulletList}>
                  {exp.bullets
                    .filter((b) => selected[b.id])
                    .map((bullet) => (
                      <View key={bullet.id} style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>
                          {bullet.label && (
                            <Text style={styles.bold}>{bullet.label}: </Text>
                          )}
                          {bullet.text}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {selected["education"] && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.itemHeaderRow}>
              <View>
                <Text style={styles.itemTitle}>{data.education.degree}</Text>
                <Text style={styles.itemSubtitle}>
                  {data.education.institution}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.itemDate}>{data.education.year}</Text>
                <Text style={styles.itemDate}>CGPA: {data.education.cgpa}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Technical Skills */}
        {selected["skills"] && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {data.skills
              .filter((s) => selected[s.id])
              .map((skill) => (
                <View key={skill.id} style={styles.skillRow}>
                  <Text style={styles.skillCategory}>{skill.title}:</Text>
                  <Text style={styles.skillItems}>{skill.items}</Text>
                </View>
              ))}
          </View>
        )}

        {/* Projects */}
        {selected["projects"] && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects
              .filter((p) => selected[p.id])
              .map((proj) => (
                <View key={proj.id} style={styles.itemGroup}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.itemTitle}>
                      {proj.name}{" "}
                      {proj.link && (
                        <Link src={proj.link} style={styles.link}>
                          ({proj.linkLabel})
                        </Link>
                      )}
                    </Text>
                  </View>
                  <View style={styles.bulletList}>
                    {proj.bullets.map((bullet) => (
                      <View key={bullet.id} style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>
                          {bullet.label && (
                            <Text style={styles.bold}>{bullet.label}: </Text>
                          )}
                          {bullet.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
          </View>
        )}

        {/* Certifications & Leadership */}
        {selected["certifications"] && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications & Leadership</Text>
            {data.certifications
              .filter((c) => selected[c.id])
              .map((cert) => (
                <View key={cert.id} style={styles.certRow}>
                  <Text style={styles.bulletText}>
                    <Text style={styles.bold}>{cert.title}: </Text>
                    {cert.desc}
                  </Text>
                </View>
              ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
